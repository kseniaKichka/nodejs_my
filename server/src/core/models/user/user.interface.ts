import SharedUserInterface from "../sharedUserInterface";

interface UserInterface extends SharedUserInterface{
    mark?: number,
    year: number
}

export default UserInterface;