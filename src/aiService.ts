import { HfInference } from "@huggingface/inference";


const getEnvVar = (key: string): string | undefined => {
  try {
    // @ts-ignore - Vite's import.meta.env is not fully typed
    return import.meta.env[key] || undefined;
  } catch {
    return undefined;
  }
};

const token = getEnvVar('VITE_HF_TOKEN');
const client = new HfInference(token);

/**
 * Converts a base64 data URL string to a Blob
 */
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Composites user photo onto a generated background using canvas
 */
async function compositeUserPhoto(
  backgroundBlob: Blob,
  userPhotoInput: Blob | string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = 1024;
    canvas.height = 1024;

    const bgImg = new Image();
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      // Load user photo
      const userImg = new Image();
      userImg.onload = () => {
        // Draw user photo in a circular frame at center-top
        const photoSize = 300;
        const photoX = (canvas.width - photoSize) / 2;
        const photoY = 100;

        // Create circular clipping
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          photoX + photoSize / 2,
          photoY + photoSize / 2,
          photoSize / 2,
          0,
          Math.PI * 2
        );
        ctx.clip();
        ctx.drawImage(userImg, photoX, photoY, photoSize, photoSize);
        ctx.restore();

        // Add border
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(
          photoX + photoSize / 2,
          photoY + photoSize / 2,
          photoSize / 2,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        resolve(canvas.toDataURL('image/png'));
      };
      userImg.onerror = reject;

      if (typeof userPhotoInput === 'string') {
        userImg.src = userPhotoInput;
      } else {
        userImg.src = URL.createObjectURL(userPhotoInput);
      }
    };
    bgImg.onerror = reject;
    bgImg.src = URL.createObjectURL(backgroundBlob);
  });
}

export async function generateNewYearCard(
  imageInput: Blob | string,
  userWish: string,
  userName: string
): Promise<string | null> {
  try {
    const prompt = `Beautiful New Year 2026 greeting card background with festive colors, fireworks, elegant design, celebration theme, high quality, professional, 1024x1024`;

    // First, try to generate a background image
    let backgroundBlob: Blob;
    
    try {
      const result = await client.textToImage({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted, text, words",
          num_inference_steps: 25,
          guidance_scale: 7.5,
        },
      });

      // Handle different response types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resultAny = result as any;
      
      if (resultAny instanceof Blob) {
        backgroundBlob = resultAny;
      } else if (resultAny && typeof resultAny === 'object' && 'blob' in resultAny) {
        backgroundBlob = await resultAny.blob();
      } else if (resultAny && typeof resultAny === 'object' && 'then' in resultAny) {
        // If it's a promise-like, await it
        const resolved = await (resultAny as Promise<Blob | Response>);
        if (resolved instanceof Blob) {
          backgroundBlob = resolved;
        } else {
          backgroundBlob = await resolved.blob();
        }
      } else {
        // Try to convert to Blob via Response
        const response = resultAny as unknown as Response;
        backgroundBlob = await response.blob();
      }
    } catch (genError) {
      console.error("Background generation failed, using fallback:", genError);
      // Fallback: create a simple gradient background
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
        gradient.addColorStop(0, '#581c87');
        gradient.addColorStop(0.5, '#831843');
        gradient.addColorStop(1, '#7c2d12');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
        backgroundBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob || new Blob());
          }, 'image/png');
        });
      } else {
        throw new Error('Could not create fallback background');
      }
    }

    // Composite user photo onto background
    const compositedImage = await compositeUserPhoto(backgroundBlob, imageInput);

    // Add text overlay
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return compositedImage; // Return without text if canvas fails
    }

    canvas.width = 1024;
    canvas.height = 1024;

    // Wait for image to load and add text
    return new Promise((resolve, reject) => {
      const bgImg = new Image();
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0);
        
        // Add text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;

        // "Happy New Year 2026"
        ctx.font = 'bold 60px Arial';
        ctx.strokeText('Happy New Year 2026', 512, 550);
        ctx.fillText('Happy New Year 2026', 512, 550);

        // User wish
        if (userWish) {
          ctx.font = 'bold 40px Arial';
          ctx.strokeText(userWish, 512, 620);
          ctx.fillText(userWish, 512, 620);
        }

        // User name
        ctx.font = 'bold 50px Arial';
        ctx.strokeText(`From ${userName}`, 512, 700);
        ctx.fillText(`From ${userName}`, 512, 700);

        resolve(canvas.toDataURL('image/png'));
      };
      bgImg.onerror = reject;
      bgImg.src = compositedImage;
    });
  } catch (error) {
    console.error("AI Image Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack:", error.stack);
    }
    return null;
  }
}
