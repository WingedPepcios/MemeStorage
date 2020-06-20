import React, { useState, useRef } from 'react';

import './useImageInput.scss';

const useImageInput = ({ title, alt = '', id }) => {
  const [imagePreview, setImagePreview] = useState();
  const imageRef = useRef(null);

  const renderImage = (target) => {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onloadend = function convertToBase64() {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const struct = (
    <div className="form__group --file">
      <label htmlFor={id}>
        {
          imagePreview
            ? (
              <img src={imagePreview} alt={alt} />
            )
            : (
              <span>{title}</span>
            )
        }
      </label>
      <input id={id} type="file" ref={imageRef} onChange={(e) => renderImage(e.target)} className="form__input" />
    </div>
  );

  return [imageRef, struct, setImagePreview];
};

export default useImageInput;
