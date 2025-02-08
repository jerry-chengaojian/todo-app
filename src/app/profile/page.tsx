'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaCamera, FaSave } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  imageUrl?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setUser(data);
      setName(data.name || '');
      setEmail(data.email || '');
      setPreview(data.imageUrl || '');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploadingImage(true);
        
        // Create a temporary preview
        setPreview(URL.createObjectURL(file));

        // Upload the image
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        setPreview(data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Reset preview on error
        setPreview(user?.imageUrl || '');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ show: false, message: '' });

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (preview.startsWith('/api/')) {
        formData.append('imageUrl', preview);
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchProfile();
        setNotification({
          show: true,
          message: 'Profile updated successfully!'
        });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fade-in">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {notification.message}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaUser className="text-blue-500" />
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            {preview ? (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                  unoptimized={preview.startsWith('/api/')}
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="text-white">Uploading...</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-4xl text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            disabled={uploadingImage}
          />
          <label
            htmlFor="image-upload"
            className={`cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 ${
              uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaCamera className="text-sm" />
            {uploadingImage ? 'Uploading...' : 'Change Photo'}
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <FaSave className="text-sm" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
} 