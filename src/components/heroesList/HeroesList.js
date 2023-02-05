import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { heroDeleted,FetchHeroes,selectAll } from '../heroesList/heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
import { createSelector } from 'reselect';

// The task for this component:
// On clicking the "x" button, the character is deleted from the global state
// Advanced task:
// The deletion takes place from the json file using the DELETE method

const HeroesList = (props) => {


  const filteredHeroesSelector = createSelector(
    selectAll,
    (state)=>state.filters.activeFilter,
    (heroes,filter) =>{
        if(filter ==="all"){
            return heroes;
         }else{
             return heroes.filter(item =>item.element === filter);
         }
    }

    
    )

  const filteredHeroes = useSelector(filteredHeroesSelector);
    
  // Get filteredHeroes and heroesLoadingStatus from the store
  const { heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);

  // Access the dispatch function to dispatch actions to the store
  const dispatch = useDispatch();

  // Get the request method from the custom hook useHttp
  const {request} = useHttp();

  // On component mount, dispatch the heroesFetching action and make a GET request to fetch heroes data
  useEffect(() => {
    dispatch(FetchHeroes());
  }, []);

  // Function to delete hero by its id
  // ONLY if the DELETE request is successful
  // Observe the chain of actions => reducers
  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(data => console.log(data, 'Deleted'))
      .then(dispatch(heroDeleted(id)))
      .catch(err => console.log(err));
  }, [request]);

  // If the heroes are still loading, show the Spinner component
  if (heroesLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (heroesLoadingStatus === "error") {
    // If there's an error in fetching heroes data, show an error message
    return <h5 className="text-center mt-5">Error loading</h5>
  }

  // Function to render the heroes list
  const renderHeroesList = (arr) => {
    // If there are no heroes, show a message
    if (arr.length === 0) {
      return (
        <CSSTransition
          timeout={0}
          classNames="hero">
          <h5 className="text-center mt-5">No heroes yet</h5>
        </CSSTransition>
      )
    }

    // Map through the heroes and return a HeroesListItem component for each hero
    return arr.map(({id, ...props}) => {
      return (
        <CSSTransition 
          key={id}
          timeout={500}
          classNames="hero">
            {/* Render the HeroesListItem component and pass the props and the onDelete callback */}
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };
  // Store the elements to be rendered in a variable
  const elements = renderHeroesList(filteredHeroes);

  // Return the TransitionGroup component with a component type of "ul"
  // and render the elements inside
  return (
    <TransitionGroup component="ul">
      {elements}
    </TransitionGroup>
  );
};

export default HeroesList;