import { BrowserRouter } from "react-router-dom";

import InfoItem from "@/components/InfoItem";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

const mockProps = {
  id: 1,
  title: "Test Title",
  comments: [],
  content: "Test Content",
  clapCount: 10,
  author: "Test Author",
  description: "Test Description",
  createdAt: "2023-01-01",
  image: "https://via.placeholder.com/150",
  classExtend: {
    wrapper: "test-wrapper",
    imgDiv: "test-imgDiv",
    contentDiv: "test-contentDiv",
  },
};

// test("renders InfoItem component", () => {
//   render(
//     <BrowserRouter>
//       <InfoItem {...mockProps} />
//     </BrowserRouter>
//   );

//   // Check if the elements are in the document
//   const titleElement = screen.queryByText(mockProps.title);
//   expect(titleElement).not.toBeNull();
//   expect(titleElement).toBeInTheDocument();
//   // expect(screen.getByText(mockProps.title)).toBeInTheDocument();
//   // expect(screen.getByText(mockProps.author)).toBeInTheDocument();
//   // expect(screen.getByText(mockProps.description)).toBeInTheDocument();
//   // expect(screen.getByText(mockProps.content)).toBeInTheDocument();

//   // Check for image```````````
//   // const image = screen.getByRole("img");
//   // expect(image).toHaveAttribute("src", mockProps.image);
//   // expect(image).toHaveAttribute("alt", mockProps.title);

//   // Check for date
//   expect(screen.getByText(new RegExp(mockProps.createdAt))).toBeInTheDocument();

//   // Check for class names
//   const wrapper = document.querySelector(`.${mockProps.classExtend.wrapper}`);
//   expect(wrapper).not.toBeNull();

//   const imgDiv = document.querySelector(`.${mockProps.classExtend.imgDiv}`);
//   expect(imgDiv).not.toBeNull();

//   const contentDiv = document.querySelector(
//     `.${mockProps.classExtend.contentDiv}`
//   );
//   expect(contentDiv).not.toBeNull();
// });

describe("InfoItem", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <InfoItem {...mockProps} />
      </BrowserRouter>
    );
  });

  test("renders title", () => {
    const titleElement = screen.getByRole("heading", { name: mockProps.title });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders author", () => {
    const authorElement = screen.getByText(mockProps.author);
    expect(authorElement).toBeInTheDocument();
  });

  test("renders description", () => {
    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders content", () => {
    const contentElement = screen.getByText(mockProps.content);
    expect(contentElement).toBeInTheDocument();
  });

  // test("renders image", () => {
  //   const imageElement = screen.getByAltText(mockProps.title);
  //   expect(imageElement).toHaveAttribute("src", mockProps.image);
  //   expect(imageElement).toHaveAttribute("alt", mockProps.title);
  // });

  test("renders date", () => {
    const dateElement = screen.getByText(mockProps.createdAt);
    expect(dateElement).toBeInTheDocument();
  });

  test("applies correct class names", () => {
    const wrapperElement = document.querySelector(
      `.${mockProps.classExtend.wrapper}`
    );
    const imgDivElement = document.querySelector(
      `.${mockProps.classExtend.imgDiv}`
    );
    const contentDivElement = document.querySelector(
      `.${mockProps.classExtend.contentDiv}`
    );

    expect(wrapperElement).toBeInTheDocument();
    expect(imgDivElement).toBeInTheDocument();
    expect(contentDivElement).toBeInTheDocument();
  });
});
