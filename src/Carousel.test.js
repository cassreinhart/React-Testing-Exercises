import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders without crashing", () => {
    render(<Carousel />)
})

//snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", ()=>{
  const {queryByTestId, queryByAltText} = render(<Carousel />)

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow")
  fireEvent.click(leftArrow)

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it("hides the left arrow when on first image", ()=> {
  const {queryByTestId} = render(<Carousel />)

  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toContainHTML('display: none;')
})

it("hides the right arrow when on first image", ()=> {
  const {queryByTestId} = render(<Carousel />)

  const rightArrow = queryByTestId("right-arrow");
  
  //hit right twice so we are on the third (and final) image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(rightArrow).toContainHTML('display: none;')
})