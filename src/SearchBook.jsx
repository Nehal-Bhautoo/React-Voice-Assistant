import React, { useState } from 'react';
import {
    InputGroup,
    Input,
    Button,
    FormGroup,
    Label,
    Spinner
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = {
    fab: {
        width: 60,
        height: 60,
        position: "fixed",
        bottom: 20,
        right: 20,
    }
}

function AppSearch() {
    // States
    const [maxResults, setMaxResults] = useState(5);
    const [startIndex, setStartIndex] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    // Handle Search
    const handleSubmit = () => {
        setLoading(true);
        if (maxResults > 40 || maxResults < 1) {
            toast.error('max results must be between 1 and 40');
        } else {
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
                ).then(res => {
                if (startIndex >= res.data.totalItems || startIndex < 1) {
                    toast.error(
                        `max results must be between 1 and ${res.data.totalItems}`
                    );
                } else {
                    if (res.data.items.length > 0) {
                        setCards(res.data.items);
                        setLoading(false);
                    }
                }
            })
            .catch(err => {
                setLoading(true);
                console.log(err.response);
            });
        }
    };
    // Main Showcase
    const mainHeader = () => {
        return (
            <div className='main-card'>
                <div className='filter'>

                </div>
                <div className='Card'>
                    <InputGroup className='inputGroup'>
                        <Input
                            className='searchBar'
                            placeholder='Book Search'
                            value={query}
                            onChange={e => setQuery(e.target.value)}/>
                        <Button className='btnSearch' onClick={handleSubmit}>
                            <i>Search</i>
                        </Button>
                        <div className="card4">
                            <div className="card-body">
                                <h2>Reference List</h2>
                                <p>Number of References: </p>
                                <Button className='referenceBtn'>View More</Button>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='filterResults col-sm-6'>
                                <FormGroup className='maxResult row'>
                                    <Label className='labelMax' for='maxResults'>Max Results</Label>
                                    <Input
                                        className='maxSearch'
                                        type='number'
                                        id='maxResults'
                                        placeholder='Max Results'
                                        value={maxResults}
                                        onChange={e => setMaxResults(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className='indexResults col'>
                                    <Label className='labelMax' for='startIndex'>Start Index</Label>
                                    <Input
                                        className='indexSearch'
                                        type='number'
                                        id='startIndex'
                                        placeholder='Start Index'
                                        value={startIndex}
                                        onChange={e => setStartIndex(e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </InputGroup>
                </div>
            </div>
        );
    };
    const handleCards = () => {
        if (loading) {
            return (
                <div className='spinnerSection'>
                    <Spinner className='spinner'/>
                </div>
            );
        } else {
            const items = cards.map((item, i) => {
                let thumbnail = '';
                if (item.volumeInfo.imageLinks) {
                    thumbnail = item.volumeInfo.imageLinks.thumbnail;
                }
                return (
                    <div className='col-sm-3' key={item.id}>
                        <div className='row-cols-3'>
                            <BookCard
                                bookNumber={i}
                                thumbnail={thumbnail}
                                title={item.volumeInfo.title}
                                pageCount={item.volumeInfo.pageCount}
                                language={item.volumeInfo.language}
                                authors={item.volumeInfo.authors}
                                publisher={item.volumeInfo.publisher}
                                description={item.volumeInfo.description}
                                previewLink={item.volumeInfo.previewLink}
                                infoLink={item.volumeInfo.infoLink}
                            />
                        </div>
                    </div>
                );
            });
            return (
                <div className='container'>
                    <div className='row listItems'>{items}</div>
                </div>
            );
        }
    };
    return (
        <div className='w-100 h-100'>
            {mainHeader()}
            {handleCards()}
            <ToastContainer />
            <Fab style={styles.fab} color='primary' aria-label='add'>
                <AddIcon/>
            </Fab>
        </div>
    );
}

export default AppSearch;