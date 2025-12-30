import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { NameInputPage } from './components/NameInputPage';
import { GreetingPage } from './components/GreetingPage';
import { UploadPage } from './components/UploadPage';
import { TemplatePage } from './components/TemplatePage';
import { DownloadPage } from './components/DownloadPage';

type Page = 'landing' | 'name' | 'greeting' | 'upload' | 'template' | 'download';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    // Auto-transition from landing to name input after 5 seconds
    if (currentPage === 'landing') {
      const timer = setTimeout(() => {
        setCurrentPage('name');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setCurrentPage('greeting');
  };

  const handleGreetingContinue = () => {
    setCurrentPage('upload');
  };

  const handlePhotoUpload = (photo: string) => {
    setUserPhoto(photo);
    setCurrentPage('template');
  };

  const handleTemplateSelect = (templateId: number, image: string) => {
    setSelectedTemplate(templateId);
    setGeneratedImage(image);
    setCurrentPage('download');
  };

  const handleBackToTemplates = () => {
    setCurrentPage('template');
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'name' && <NameInputPage onSubmit={handleNameSubmit} />}
      {currentPage === 'greeting' && (
        <GreetingPage name={userName} onContinue={handleGreetingContinue} />
      )}
      {currentPage === 'upload' && <UploadPage onUpload={handlePhotoUpload} />}
      {currentPage === 'template' && userPhoto && (
        <TemplatePage
          userPhoto={userPhoto}
          userName={userName}
          onTemplateSelect={handleTemplateSelect}
        />
      )}
      {currentPage === 'download' && generatedImage && (
        <DownloadPage
          generatedImage={generatedImage}
          userName={userName}
          onBackToTemplates={handleBackToTemplates}
        />
      )}
    </div>
  );
}
