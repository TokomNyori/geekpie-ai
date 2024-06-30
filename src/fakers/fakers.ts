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