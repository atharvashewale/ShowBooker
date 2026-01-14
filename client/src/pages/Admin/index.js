import React from 'react';
import { Tabs } from 'antd';
import MoviesList from './MoviesList';
import TheatreTable from './TheatreTable';

function Admin() {
    const tabItems = [ 
        {
            key: "1",
            label: "Movies",
            children: <MoviesList></MoviesList>
        },
        {
            key: "2",
            label: "Theatres",
            children: <TheatreTable></TheatreTable>
        }
    ];

  return (
    <div>
        <Tabs items={ tabItems }></Tabs>
    </div>
  )
}

export default Admin