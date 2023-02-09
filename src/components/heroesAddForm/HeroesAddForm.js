import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    
    // State hook to keep track of hero name
    const [heroName, setHeroName] = useState('');
    // State hook to keep track of hero description
    const [heroDescr, setHeroDescr] = useState('');
    // State hook to keep track of hero element
    const [heroElement, setHeroElement] = useState('');

    const [createHero,{isLoading}] =useCreateHeroMutation();

    // Use the useSelector hook to retrieve data from the store
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    // Use the useDispatch hook to dispatch actions to the store
    
    // Use the useHttp hook to make HTTP requests

    // Submit event handler for the form
    const onSubmitHandler = (e) => {
        // Prevent the default form submit behavior
        e.preventDefault();
        
        // Create a new hero object with unique ID and the user input values
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        // Make a POST request to create a new hero, using the request method from the useHttp hook
        createHero(newHero).unwrap();

        // Reset the input fields to empty strings
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    // Function to render the filters options for the hero element select input
    const renderFilters = (filters, status) => {
        // If the filters are still loading, return a loading message
        if (status === "loading") {
            return <option>Loading</option>
        } else if (status === "error") {
            return <option>Error</option>
        }
        
        // If the filters are available, render them as options
        if (filters && filters.length > 0) {
            return filters.map(filter=>
                    <option key={uuidv4()} value = {filter}>{filter}</option>
        )
            }
        }
    
    // Log the filters to the console for debugging purposes


    // Return the form to be rendered
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of new hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What about name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What i can to do?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose your element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                        <option value="">My elements is...</option>
                         {renderFilters(filters, filtersLoadingStatus)}
                        
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;