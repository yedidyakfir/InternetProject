import Book from '../model/Book';

//Simple version, without validation or sanitation
export function test (req, res) {
    res.send(Book)
    res.send('Greetings from the Test controller!');
}