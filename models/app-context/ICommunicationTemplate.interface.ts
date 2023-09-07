export interface ICommunicationTemplate {
  usage: string; // i.e. 'Invitation'
  channel: string; // i.e. 'sms'
  category: string; // i.e. 'CC_Invitation__User'
}

export interface ICommunicationTemplates {
  templates: ICommunicationTemplate[];
  description: string;
}
