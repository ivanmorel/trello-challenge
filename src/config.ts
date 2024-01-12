const boardId = 9206728921179140001;
const accessToken = 'a4468a4d-85ae-432d-b552-7dfd9d40ac67';
const apiUrl = `https://dev-game-services.objectiveed.com/boards/${boardId}`;
const groupsApiUrl = `${apiUrl}/groups`;
const tasksApiUrl = `${apiUrl}/tasks`;

export {
    accessToken,
    groupsApiUrl,
    tasksApiUrl,
}