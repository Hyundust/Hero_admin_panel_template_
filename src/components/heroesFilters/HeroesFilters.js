import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { filtersChanged,FetchFilters } from '../heroesFilters/filtersSlice';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {
  // Get filters, filters loading status, and active filter from the state
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
  // Get the dispatch function from the react-redux store
  const dispatch = useDispatch();
  // Get the request function from the useHttp hook
  const { request } = useHttp();

  // Fetch filters on component mount
  useEffect(() => {
    
    dispatch(FetchFilters());

    // eslint-disable-next-line
  }, []);

  // If filters are still loading, show the spinner
  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  }
  // If there was an error fetching the filters, show an error message
  else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>
  }

  // Render the filters
  const renderFilters = (arr) => {
    // If there are no filters, show a message
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">There is no filters</h5>
    }

    // Map over the filters and render a button for each filter
    return arr.map((name) => {
      const btnClass = classNames('btn', {
        'active': name === activeFilter
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {name}
        </button>
      );
    });
  }

  // Call the renderFilters function to get the elements to render
  const elements = renderFilters(filters);

  // Render the filters component
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filters</p>
        <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters; 
