import React from 'react'; 
import ReactDOM from 'react-dom';
import createUser from '../createUser';
import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import renderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
     <createUser></createUser>
     </BrowserRouter>, div)
})


 

// //This will convert this to like a virtual DOM object
it("matches snapshot", () =>{
    const tree= renderer.create(<BrowserRouter><createUser><div><form><label>"ID"</label></form></div></createUser></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot(); 
    //It looks for folder called snapshot
} )