import { LightningElement, api, track } from 'lwc';

export default class SuperDuperChat extends LightningElement {

    @api recordId;
    @track messages = []; // {type: 'EndUser', name: 'John', content: 'this is a test', timestamp: '01/01/2024, 11:59:59'}
    language = 'en';

    connectedCallback() {
        this.populateMessagesId();
    }

    renderedCallback() {
        this.refs.scrollToBottom.scrollIntoView();
    }

    populateMessagesId() {
        let counter = 1;
        this.messages.forEach((message) => {
            if (!message.id) {
                message.id = `msg${counter}`;
                counter++;
            }
        });
    }

    handleEndUserMessage(event) {
        this.messages.push({
            type: 'EndUser',
            name: event.detail.name,
            content: event.detail.content,
            timestamp: new Date(event.detail.timestamp).toLocaleString()
        });
        event.stopPropagation();
    }

    handleAgentMessage(event) {
        this.messages.push({
            type: 'Agent',
            name: event.detail.name,
            content: event.detail.content,
            timestamp: new Date(event.detail.timestamp).toLocaleString()
        });
        event.stopPropagation();
    }

    handleLanguageChange(event) {
        this.language = event.detail;
        event.stopPropagation();
    }

    handleSendAgentMessage(event) {
        const miaw = this.template.querySelector('c-super-duper-chat-miaw');
        miaw.sendTextMessage(event.detail);
    }

}