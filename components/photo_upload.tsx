import { useState } from 'react';
import { FiUpload } from 'react-icons/fi'; 
import styles from '../styles/components/photo_upload.module.scss'; 
import Image from 'next/image';

const PhotoUploader = ({ onPhotoChange, value }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);

    if (onPhotoChange) {
      onPhotoChange(file);
    }
  };

  return (
    <div className={styles.container}>
      {value ? (
        <Image src={URL.createObjectURL(new Blob([value], { type: value.type }))} width={300} height={300} className={styles.previewImage} alt="Preview" objectFit='cover'/>
      ) : (
        <label htmlFor="photoInput" className={styles.uploadButton}>
          <FiUpload size={30} />
          <span>Subir foto</span>
        </label>
      )}
      <input
        type="file"
        id="photoInput"
        accept="image/*"
        onChange={handlePhotoChange}
        className={styles.fileInput}
      />
    </div>
  );
};

export default PhotoUploader;
