import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

it('should render', ()=>{
    render(<Card />)
})

//snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<Card />); //asFragment is an object 
    expect(asFragment()).toMatchSnapshot(); //when executed, gives the underlying DOM structure
    //aka expect the underlyingDOM Structure to match the snapshot (looks in __snapshot__ directory)
})