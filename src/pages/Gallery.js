import { PhotoGallery } from '../components/photoGallery';
import React from 'react';

const Gallery = () => (
  <section className='section top__indent-large'>
    <div className='container fluid full'>
      <div className='row'>
        <div className='col-xs-12'>
          <PhotoGallery />
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
