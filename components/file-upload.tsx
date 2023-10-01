'use client';
import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, UploadIcon } from 'lucide-react';
import axios from 'axios';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import FileCard, { FileCardProp } from './file-card';

const FileUpload = () => {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [progress, setProgress] = useState(0);
  const [responseCards, setResponseCards] = useState<FileCardProp[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    const data = new FormData();
    for (let file of fileList!) {
      data.append(file.name, file);
    }
    try {
      const response = await axios.post(`/api/upload`, data, {
        onUploadProgress(e) {
          const uploadProgress = e.progress ?? 0;
          setProgress(uploadProgress * 100);
          if (uploadProgress * 100 >= 100) {
            setFileList(null);
          }
        },
      });

      if (response.data.ok) {
        setResponseCards(response.data.data);
        setErrorMessage(null);
      } else {
        setResponseCards([]);
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Something went wrong.');
    }
  };

  const uploading = progress > 0 && progress < 100;

  useEffect(() => {
  }, [responseCards, errorMessage]);

  return (
    <div className="flex flex-col items-center py-4 h-screen w-3/5">
      <div
        className={`w-2/3 py-20 text-center dark:bg-zinc-900 h-max p-4 grid place-content-center text-zinc-900 dark:text-gray-200 rounded-lg border-4 border-dashed transition-colors ${
          shouldHighlight
            ? 'dark:border-zinc-600 dark:bg-zinc-800'
            : 'dark:border-zinc-800 dark:bg-zinc-950'
        }`}
        onDragOver={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragEnter={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragLeave={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(false);
        }}
        onDrop={(e) => {
          preventDefaultHandler(e);
          const files = Array.from(e.dataTransfer.files);
          setFileList(files);
          setShouldHighlight(false);
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (!e.target.files) {
              return;
            }

            const files = Array.from(e.target.files)
            setFileList(files);
            setShouldHighlight(false)
          }}
          multiple // Add the 'multiple' attribute to accept multiple files
        />
        {!fileList ? (
          <div
            className="flex flex-col items-center justify-between gap-3 cursor-pointer"
            onClick={(e) => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            <UploadIcon className="w-10 h-10" />
            <span>
              <span>Choose a File</span> or drag it here
            </span>
          </div>
        ) : (
          <>
            <p>Files to Upload</p>
            {fileList.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className="flex gap-2 mt-2 flex-row justify-center">
              <Button
                className={`${
                  uploading
                    ? 'px-2 py-1 rounded-md pointer-events-none cursor-wait opacity-40 w-full'
                    : 'px-2 py-1 rounded-md'
                }`}
                onClick={() => {
                  handleUpload();
                }}
              >
                {uploading
                  ? `Uploading... (${progress.toFixed(2)}%)`
                  : 'Upload'}
              </Button>
              {!uploading && (
                <Button
                  className="px-2 py-1 rounded-md"
                  onClick={() => {
                    setFileList(null);
                    setResponseCards([]);
                    setErrorMessage(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {errorMessage ? (
          <Alert variant="destructive" className="flex flex-col w-auto">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : (
          <>
            {responseCards.length > 0 &&
              responseCards.map((card, index) => (
                <FileCard key={index} file={card} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
