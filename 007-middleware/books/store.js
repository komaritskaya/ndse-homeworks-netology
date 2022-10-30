import { Book } from "./model";

export const store = {
    testUser: { id: 1, mail: "test@mail.ru" },
    bookStorage: [
        new Book({
            id: '1',
            title: 'The Adventures of Tom Sawyer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.',
            authors: 'Mark Twain',
            favorite: 'unknown',
            fileCover: 'the-adventures-of-tom-sawyer.jpg',
            fileName: 'the-adventures-of-tom-sawyer.pdf',
        }),
        new Book({
            id: '2',
            title: 'The Green Mile',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.',
            authors: 'Stephen King',
            favorite: 'unknown',
            fileCover: 'the-green-mile.jpg',
            fileName: 'the-green-mile.pdf',
        })
    ],
};