
import {  useCallback,useMemo } from 'react';
import {  useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';


import { useGetHeroesQuery,useDeleteHeroMutation } from '../../api/apiSlice';

const HeroesList = (props) => {
    const {
      data:heroes = [],
      isLoading,
      isError,  
    } = useGetHeroesQuery();

  const activeFilter = useSelector(state=>state.filters.activeFilter);

  const [deleteHero]= useDeleteHeroMutation();

  const filteredHeroes = useMemo(() =>{
    const filteredHeroes=heroes.slice();

      if(activeFilter ==="all"){
          return filteredHeroes;
      }else{
         return filteredHeroes.filter(item =>item.element === activeFilter);
     }
    },[activeFilter, heroes]);
    

 

  // Function to delete hero by its id
  
  const onDelete = useCallback((id)=>{
    deleteHero(id);
  },[deleteHero]);


  // If the heroes are still loading, show the Spinner component
  if (isLoading) {
    return <Spinner/>;
  } else if (isError) {
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