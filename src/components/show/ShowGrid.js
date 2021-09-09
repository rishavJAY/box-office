import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT__FOUND from '../../images/not-found.png';

const ShowGrid = ({ data }) => {
    return <div>
        {
            data.map(({ show }) => (
                <ShowCard
                    key={show.id}
                    id={show.id}
                    name={show.name}
                    image={show.image ? show.image.medium : IMAGE_NOT__FOUND}
                    summary={show.summary}
                />
            ))
        }
    </div>
}

export default ShowGrid
