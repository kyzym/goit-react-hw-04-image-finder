import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './utils/api/imageAPI';
import {
  ImageGallery,
  Searchbar,
  LoadMoreBtn,
  Loader,
  Message,
  Modal,
} from './utils/AppComponentsMap';
import * as SC from 'components/App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => setPage(state => state + 1);

  const onModal = imageUrl => setLargeImage(imageUrl);

  const clearLargeImage = () => setLargeImage('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    async function fetchData() {
      const fetchedImages = await fetchPictures(query, page);
      const { hits } = fetchedImages;

      if (hits.length === 0) {
        setStatus('empty');
        setImages([]);
        return;
      }

      setImages(state => [...state, ...hits]);
      setTotalPages(Math.ceil(fetchedImages.total / 12));
      setTotalImages(fetchedImages.totalHits);
      setStatus('resolved');
    }

    try {
      fetchData();
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  }, [query, page]);

  return (
    <SC.App>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'pending' && totalImages === 0 && <Loader />}

      {status === 'idle' && (
        <Message message="I lost the image, please find it." status={status} />
      )}

      {status === 'empty' && (
        <Message message="We didn't find anything. It's sad." status={status} />
      )}

      {status === 'error' && (
        <Message message="Hm... Refresh the page please." status={status} />
      )}

      {<ImageGallery images={images} onModal={onModal} />}
      {status !== 'empty' && totalPages !== page && (
        <LoadMoreBtn onLoadMore={onLoadMore} status={status} />
      )}

      {largeImage && (
        <Modal clearImage={clearLargeImage}>
          <img src={largeImage} alt="Sorry, nothing here " />
        </Modal>
      )}

      <ToastContainer autoClose={1000} />
    </SC.App>
  );
};
