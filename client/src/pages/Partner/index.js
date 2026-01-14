import React from 'react';
import TheatreList from './TheatreList';
import { Tabs } from 'antd';

function Partner() {

    const itemsList = [
        {
            key: "1",
            label: "Theatres",
            children: <TheatreList></TheatreList>
        }
    ];

  return (
    <>
        <h1>Partner's Page</h1>
        <Tabs items={itemsList}></Tabs>
    </>
  )
}

export default Partner