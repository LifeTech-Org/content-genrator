export interface TFormData {
  subject?: string;
  description?: string;
  targetCountry?: string;
  language?: string;
  contentFormat?: string;
  emailType?: string;
  subjectLineGeneration?: string;
  subjectLineStyle?: string;
  emailOutputFormat?: string;
  emailSequenceType?: string;
  noOfEmailsInSeq?: string;
  emailsInterval?: string;
  emailsobj?: [];
  smsType?: string;
  smsSequence?: string;
  smsInterval?: string;
  smsSequenceObj?: string;
  hashtagInclusion?: string;
  numberOfDesiredHashtags?: string;
  articleType?: string;
  articleStructure?: string;
  noOfArticlesInSeries?: string;
  seriesStructure?: string;
  writingStyles?: string;
  targetAudiences?: string;
  communicationObjectives?: string;
  contentLengths?: string;
  elementsToInclude?: string[];
  aiModels?: string;
  urgencyLevels?: string;
  outputFormats?: string;
  offerDetails?: string;
  keywords?: string[];
}

export interface Layout {
  title: string;
  upload_placeholder: string;
  form: Form;
  preview: string;
  select_generated_content: string;
  preview_modal: PreviewModal;
  confirm_selection: string;
  sign_out: string;
  data: { [key: string]: Datum[] };
}

export interface Datum {
  label: string;
  value: string;
}

export interface Form {
  heading: string;
  subject: AIModel;
  description: AIModel;
  target_country: AIModel;
  language: AIModel;
  content_format: AIModel;
  writing_style: AIModel;
  target_audience: AIModel;
  communication_objectives: AIModel;
  content_length: AIModel;
  elements_to_include: AIModel;
  ai_model: AIModel;
  urgency_level: AIModel;
  keywords: AIModel;
  output_format: AIModel;
  email_marketting: EmailMarketting;
  sms: SMS;
  social_media: SocialMedia;
  blog_article: BlogArticle;
}

export interface AIModel {
  label: string;
  placeholder: string;
}

export interface BlogArticle {
  article_type: AIModel;
  sequence: AIModel;
  series_structure: AIModel;
  article_structure: AIModel;
}

export interface EmailMarketting {
  email_type: AIModel;
  subject_line_generation: AIModel;
  subject_line_style: AIModel;
  email_output_format: AIModel;
  email_sequence_type: AIModel;
  no_of_emails_in_seq: AIModel;
  emails_interval: AIModel;
  email_objective: AIModel;
  email_trigger: AIModel;
}

export interface SMS {
  sms_type: AIModel;
  sms_sequence: AIModel;
  sms_interval: AIModel;
  sms_sequence_obj: AIModel;
}

export interface SocialMedia {
  hash_tag_inclusion: AIModel;
  number_of_desired_hashtags: AIModel;
}

export interface PreviewModal {
  title: string;
  save_template: string;
  submit: string;
}
