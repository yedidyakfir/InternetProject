import User from '../model/User';

//Simple version, without validation or sanitation
export function test (req, res) {
    res.send(User)
    res.send('Greetings from the Test controller!');
}