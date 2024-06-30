export function createMockFormEvent(): React.FormEvent<HTMLFormElement> {
    const form = document.createElement("form"); // Create a form element
    const event = new Event("submit", {
        bubbles: true,
        cancelable: true,
    }) as any; // Create a basic event with submit type

    // Enhance the event with React event properties
    const formEvent: React.FormEvent<HTMLFormElement> = {
        ...event,
        currentTarget: form,
        target: form,
        preventDefault: () => { }, // Mock preventDefault to prevent actual form submission behavior
        stopPropagation: () => { }, // Mock stopPropagation to isolate the event
        nativeEvent: event,
    };

    return formEvent as React.FormEvent<HTMLFormElement>;
}


export function createMockMouseEvent(): React.MouseEvent<HTMLDivElement, MouseEvent> {
    const div = document.createElement("div"); // Create a div element to act as the event target
    const mouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: 100,
        clientY: 100
    }) as any; // Create a basic mouse event with click type

    // Enhance the mouse event with React event properties
    const reactMouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent> = {
        ...mouseEvent,
        currentTarget: div,
        target: div,
        preventDefault: () => {}, // Mock preventDefault to prevent any default action
        stopPropagation: () => {}, // Mock stopPropagation to prevent event bubbling
        nativeEvent: mouseEvent,
    };

    return reactMouseEvent as React.MouseEvent<HTMLDivElement, MouseEvent>;
}