import React from "react";

import './BookOffTheWeek.css'
import { BookInformation } from "../../../book";

export const BookOffTheWeek:React.FC = () => {
    return(
        <div className="book-of-the-week">
            <h1>Book of the week</h1>
            <BookInformation book={
                {
                    _id:"1234",
                    barcode: "1234",
                    cover:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
                    title: "asda das asdasdasdasdasdasdas asdasdasdasdasdasdas",
                    authors: ["Mak Read"],
                    description: "sad asdasd asdasdas dadasd adasdaasdas dasd asdasdasdasdasasdasd asdasdasdasd adasdasd dasd asdasdasd asdasdasdasdasdd",
                    subjects: ["java", "learning"],
                    publicationDate: new Date("2023-02-28"),
                    publisher: "Some publisher",
                    pages: 300,
                    genre: "Non-fiction",
                    records:[]
                }   
            } />
        </div>
    )
}