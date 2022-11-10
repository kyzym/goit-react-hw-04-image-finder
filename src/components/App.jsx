import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './utils/api/imageAPI';
import {
  ImageGallery,
  Searchbar,
  LoadMoreBtn,
  Loader,
  Message,
  Modal,
} from './utils/AppComponensMap';
import * as SC from 'components/App.styled';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    largeImage: '',
    status: 'idle',
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModal = imageUrl => {
    this.setState({ largeImage: imageUrl });
  };

  clearLargeImage = () => {
    this.setState({ largeImage: '' });
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query === query && prevState.page === page) {
      return;
    }

    this.setState({ status: 'pending' });

    try {
      const fetchedImages = await fetchPictures(query, page);
      const { hits } = fetchedImages;

      if (hits.length === 0) {
        return this.setState({ status: 'empty', images: [] });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalImages: fetchedImages.totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      console.log(error);
      this.setState({ status: 'error' });
    }
  }

  render() {
    const { handleFormSubmit, onLoadMore, onModal, clearLargeImage } = this;
    const { images, status, totalImages, page, largeImage } = this.state;
    const restOfImages = totalImages - page * 12;

    return (
      <SC.App>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'pending' && totalImages === 0 && <Loader />}

        {status === 'idle' && (
          <Message
            message="I lost the image, please find it."
            status={status}
          />
        )}

        {status === 'empty' && (
          <Message
            message="We didn't find anything. It's sad."
            status={status}
          />
        )}

        {status === 'error' && (
          <Message
            message="We have a problem. We have to look at the console logs."
            status={status}
          />
        )}

        {<ImageGallery images={images} onModal={onModal} />}
        {restOfImages > 0 && images.length > 0 && (
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
  }
}
