import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import Icons from 'assets/icons';

export interface PaginationProps {
    /**
     * onClick handler
     */
    setPage: (page: number) => void;
    /**
     * Maximum page number
     */
    maxPages: number;
    /**
     * Current page
     */
    currentPage: number;
    /**
    * Main pages colour
    */
    mainColor?: string;
    /**
    * Hover colour for pages
    */
    hoverColor?: string;
    /**
     * Index background color when selected
     */
    backgroundColor?: string;
    /**
    * Icon svg for Left button
    */
    sourceIconLeft?: string;
    /**
    * Icon svg for Right button
    */
    sourceIconRight?: string;
    /**
     * Number of pages to be rendered
     */
    pagesPerIndex?: number;
    /**
     * currentIndex
     */
    index: number;
    /**
     * setCurrentIndex function
     */
    setIndex: (index: number) => void;
}

const StyledSVG = styled(SVG)``;

const StyledPagination = styled.button<{ main: string, hover: string, backgroundColor: string }>`
    height: 40px;
    width: 40px;
    flex-wrap: wrap;
    border: 0;
    border-radius: 70%;
    spacing: 10px;
    margin: 6;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    transition: 0.5s height ease-in-out;

    ${props => `
        color: ${props.main};
        background-color: ${props.backgroundColor};

        &:hover {
            color: ${props.hover}; 
        }

        &:active {
            transform: scale(1.5);
        }
    `} 
`;

const Pagination = ({
    setPage,
    maxPages = 10,
    currentPage,
    mainColor = 'grey',
    hoverColor = 'black',
    backgroundColor = 'white',
    sourceIconLeft = Icons.ChevronLeft,
    sourceIconRight = Icons.ChevronRight,
    pagesPerIndex = 10,
    index,
    setIndex,
    ...props
}: PaginationProps): JSX.Element => {
    const handleNextIndexClick = () => {
        if (index && currentPage) {
            if ((index * pagesPerIndex) < maxPages) {
                setIndex(index + 1);
                setPage((index * pagesPerIndex) + 1);
            } else if (currentPage < maxPages) {
                setPage(maxPages);
            }
        }
    };

    const handlePreviousIndexClick = () => {
        if (index && currentPage) {
            if (index > 1) {
                setIndex(index - 1);
                setPage(((index - 1) * pagesPerIndex));
            } else if (index === 1 && currentPage !== 1) {
                setPage(1);
            }
        }
    };

    const handleNextPageClick = () => {
        if (currentPage < maxPages) {
            if (currentPage === ((index) * pagesPerIndex)) {
                setIndex(index + 1);
                setPage(currentPage + 1);
            } else setPage(currentPage + 1);
        }
    };

    const handlePreviousPageClick = () => {
        if (currentPage > 1) {
            if (currentPage === (((index - 1) * pagesPerIndex) + 1)) {
                setIndex(index - 1);
                setPage(currentPage - 1);
            } else setPage(currentPage - 1);
        }
    };

    const renderPages = () => {
        const pages = [];
        for (let i = ((index - 1) * pagesPerIndex); i < maxPages && i < index * pagesPerIndex; i += 1) {
            pages.push(<StyledPagination key={i + 1} backgroundColor={currentPage === (i + 1) ? 'rgba(105, 137, 254, 0.1)' : 'transparent'} main={mainColor} hover={hoverColor} onClick={() => setPage(i + 1)} {...props}>{i + 1}</StyledPagination>);
        }
        return pages;
    };

    return (
        <div>
            <StyledPagination
                main={mainColor}
                hover={hoverColor}
                backgroundColor='transparent'
                onClick={() => { handlePreviousIndexClick(); }}
                {...props}
            >
                <StyledSVG src={Icons.ChevronLeftDouble} />
            </StyledPagination>

            <StyledPagination
                main={mainColor}
                hover={hoverColor}
                backgroundColor='transparent'
                onClick={() => { handlePreviousPageClick(); }}
                {...props}
            >
                <StyledSVG src={sourceIconLeft} />
            </StyledPagination>

            {renderPages()}

            <StyledPagination
                main={mainColor}
                hover={hoverColor}
                backgroundColor='transparent'
                onClick={() => { handleNextPageClick(); }}
                {...props}
            >
                <StyledSVG src={sourceIconRight} />
            </StyledPagination>

            <StyledPagination
                main={mainColor}
                hover={hoverColor}
                backgroundColor='transparent'
                onClick={() => { handleNextIndexClick(); }}
                {...props}
            >
                <StyledSVG src={Icons.ChevronRightDouble} />
            </StyledPagination>
        </div>
    );
};

Pagination.defaultProps = {
    mainColor: 'grey',
    /**
    * Hover colour for pages
    */
    hoverColor: 'black',
    /**
     * Index background color when selected
     */
    backgroundColor: 'white',
    /**
    * Icon svg for Left button
    */
    sourceIconLeft: Icons.ChevronLeft,
    /**
    * Icon svg for Right button
    */
    sourceIconRight: Icons.ChevronRight,
    /**
     * Number of pages to be rendered
     */
    pagesPerIndex: 10,
};

export default Pagination;
