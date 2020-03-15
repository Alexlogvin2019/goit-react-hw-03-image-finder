import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/searchbar/SearchBar";
import LoaderPage from "./components/loader/Loader";
import axios from "axios";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
const KEY = "15301640-60ff378e35eeb1b3833f20eb8";

class App extends Component {
  state = {
    galleryItems: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    page: 1,
    largeImageUrl: null,
    openModal: false
  };

  handleSubmit = e => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(data =>
        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...data.data.hits]
        }))
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    await this.setState({ galleryItems: [] });
    await this.handleSubmit();
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  buttonMore = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    this.handleSubmit();
  };
  componentDidUpdate() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  setLargeImage = largeImageUrl => {
    this.setState({ largeImageUrl: largeImageUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ openModal: !state.openModal }));
  };

  render() {
    const { isLoading, galleryItems, searchQuery } = this.state;
    return (
      <div className="App">
        <SearchBar
          handleOnSubmit={this.handleOnSubmit}
          handleChange={this.handleChange}
          searchQuery={searchQuery}
        />
        {isLoading && <LoaderPage />}
        <ImageGallery galleryItems={galleryItems} onOpen={this.setLargeImage} />
        {this.state.openModal && (
          <Modal url={this.state.largeImageUrl} onClose={this.toggleModal} />
        )}
        <Button buttonMore={this.buttonMore} />
      </div>
    );
  }
}

export default App;
