import React, {useState} from 'react';
import "./components/referenceform.css";
import {Button, FormGroup, Input, InputGroup, Label, Spinner} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import MicOff from '@material-ui/icons/MicOff';
import Fab from "@material-ui/core/Fab";

const styles = {
    fab: {
        width: 60,
        height: 60,
        position: "fixed",
        bottom: 20,
        right: 20,
    },
    fab2: {
        width: 60,
        height: 60,
        position: "fixed",
        bottom: 100,
        right: 20,
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

let tts = window.speechSynthesis;

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
                    <InputGroup className='inputGroup' id="search-form">
                        <Input
                            className='searchBar'
                            id="search-form-input"
                            placeholder='Book Search'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            />
                        <Button className='btnSearch' onClick={handleSubmit} id="searchBtn">
                            <i>Search</i>
                        </Button>
                        {/*Select Voice: <select id='voiceList' hidden={true}></select>*/}
                        <div className='container'>
                            <div className='filterResults col-sm-6' hidden={true}>
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
        <div className='w-100 h-150'>
            {mainHeader()}
            {handleCards()}
            <ToastContainer />
            <Fab style={styles.fab} onClick={StartSpeech} color='primary' aria-label='add' id="micBtn" >
                <SettingsVoiceIcon id="micIcon" className="microphone" />
            </Fab>
            <Fab style={styles.fab2} color="secondary" aria-label="end" id="muteBtn">
                <MicOff id="micOffIcon" className="microphoneOff"/>
            </Fab>
        </div>
    );
}

function StartSpeech() {
    const searchFormInput = document.querySelector('#search-form-input');
    const muteBtn = document.querySelector("#muteBtn");
    recognition.start();
    recognition.addEventListener("result", resultOfSpeechRecognition);
    if(SpeechRecognition === false) {
        toast.success("Speech Recognition on");
    } else {
        toast.success("Speech Recognition On");
    }
    muteBtn.addEventListener("click", EndSpeech);
    function EndSpeech() {
        if(SpeechRecognition) {
            recognition.stop();
            toast.error("Speech Recognition off");
        } else {
            return toast.error("Speech Recognition Already off");
        }
    }
    let voices = [];
    voices = tts.getVoices();
    let selectedVoiceName = "Microsoft David Desktop - English (United States)";

    function resultOfSpeechRecognition(event) {
        const transcript = event.results[0][0].transcript;
        if(transcript.toLowerCase().trim()==="stop recording") {
            recognition.stop();
        } else if(!searchFormInput.value) {
            searchFormInput.value = transcript;
            console.log(transcript);
        } else {
            if(transcript.toLowerCase().trim().endsWith("search")) {
                searchFormInput.focus();
                const searchBtn = document.querySelector('#searchBtn');
                searchBtn.click();
                let toSpeak = new SpeechSynthesisUtterance("Performing Search");
                voices.forEach((voice) => {
                    if(voice.name === selectedVoiceName ) {
                        toSpeak.voice = voice;
                    }
                });
                tts.speak(toSpeak);
            } else if(transcript.toLowerCase().trim().startsWith("reset")) {
                searchFormInput.value = "";
                let toSpeak = new SpeechSynthesisUtterance("Resetting Input");
                voices.forEach((voice) => {
                    if(voice.name === selectedVoiceName ) {
                        toSpeak.voice = voice;
                    }
                });
                tts.speak(toSpeak);
                console.log(transcript);
            } else if(transcript.toLowerCase().trim().startsWith("get")) {
                let ids = transcript[5];
                let all = transcript[transcript.length - 1];
                console.log(ids);
                if(ids === "n") {
                    const bookCardBodyBtn = document.getElementById(0).click();
                    console.log(bookCardBodyBtn);
                    let toSpeak = new SpeechSynthesisUtterance("Added first book to list");
                    voices.forEach((voice) => {
                        if(voice.name === selectedVoiceName ) {
                            toSpeak.voice = voice;
                        }
                    });
                    tts.speak(toSpeak);
                    toast.info("Book Added to list");
                } else if(ids === "w") {
                    const bookCardBodyBtn = document.getElementById(1).click();
                    console.log(bookCardBodyBtn);
                    toast.info("Book Added to list");
                } else if(ids === "h") {
                    const bookCardBodyBtn = document.getElementById(2).click();
                    console.log(bookCardBodyBtn);
                    toast.info("Book Added to list");
                } else if(ids === "o") {
                    const bookCardBodyBtn = document.getElementById(3).click();
                    console.log(bookCardBodyBtn);
                    toast.info("Book Added to list");
                } else if(all === "l") {
                    let i;
                    for(i = 0; i < 5; i++) {
                        const bookCardBodyBtn = document.getElementById(i).click();
                        console.log(bookCardBodyBtn);
                    }
                    let toSpeak = new SpeechSynthesisUtterance("Added All book to list");
                    voices.forEach((voice) => {
                        if(voice.name === selectedVoiceName ) {
                            toSpeak.voice = voice;
                        }
                    });
                    tts.speak(toSpeak);
                    toast.info(" All Book Added to list");
                } else {
                    toast.error("Book Number not found");
                }
                console.log(transcript);
            } else if(transcript.toLowerCase().trim().match("email")) {
                document.getElementById("sentViaMailBtn").click();
                let toSpeak = new SpeechSynthesisUtterance("Sending List to mail");
                voices.forEach((voice) => {
                    if(voice.name === selectedVoiceName ) {
                        toSpeak.voice = voice;
                    }
                });
                tts.speak(toSpeak);
            } else {
                console.log(transcript);
                searchFormInput.value = transcript;
                const searchBtn = document.querySelector('#searchBtn');
                searchBtn.click();
            }
        }
    }
}

export default AppSearch;