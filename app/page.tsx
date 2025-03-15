/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
import { ActionMeta } from "react-select";
import { aiModels, articleStructures, communicationObjectives, contentFormats, contentLengths, countries, elementsToInclude, emailOutputFormats, emailSequenceTypes, languages, objectives, outputFormats, seriesStructures, smsSequenceObjectives, subjectLineStyles, targetAudiences, triggers, urgencyLevels, writingStyles } from "./data";
import { TFormData } from "./type";
import CustomSelect from "./components/select";
import CustomInput from "./components/input";
import CreatableSelect from "react-select/creatable";

const ContentGenerationForm = () => {
  const [formData, setFormData] = useState<TFormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData!, [name]: value });
  };

  const handleSelectChange = (
    selectedOption: any,
    actionMeta: ActionMeta<{ value: string; label: string; }>
  ) => {
    setFormData({
      ...formData!,
      [actionMeta.name!]: Array.isArray(selectedOption)
        ? selectedOption.map(option => option.value) // Handle multiple values
        : selectedOption?.value || "", // Handle single value
    });
  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <CustomSelect name="targetCountry" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Target Country/Market" placeholder="Select a country..." showOthers={formData.targetCountry !== undefined && (formData.targetCountry === "" || !countries.find(({ value }) => formData.targetCountry === value))} values={countries} />
        <CustomSelect name="language" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Language" placeholder="Select a language..." showOthers={formData.language !== undefined && (formData.language === "" || !languages.find(({ value }) => formData.language === value))} values={languages} />

        <CustomSelect name="contentFormat" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Main Content Format" placeholder="Select a content format..." showOthers={false} values={contentFormats} />

        {formData.contentFormat === "Email marketing" && <div className="space-y-4">
          <CustomSelect name="emailType" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Email Type" placeholder="Select an email type..." showOthers={false} values={[{ label: "Individual Email", value: "individual" }, { label: "Programmed Email Sequence", value: "sequence" }]} />
          {formData.emailType === "sequence" && <div className="space-y-4">
            <CustomSelect name="emailSequenceType" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Sequence type" placeholder="Select sequence type" showOthers={false} values={emailSequenceTypes} />
            <CustomInput label="Number of emails in sequence" type="number" handleChange={handleChange} name="noOfEmailsInSeq" min="2" max="10" />
            <CustomInput label="Interval between emails (hours)" type="number" handleChange={handleChange} name="emailsInterval" min="1" />
            {formData.noOfEmailsInSeq && <div className="space-y-4">
              {Array.from({ length: parseInt(formData.noOfEmailsInSeq) }).map((_, index) => (
                <div key={index} className="p-4 border border-[var(--border)] rounded-lg shadow-sm space-y-2">
                  <h4 className="mb-2 text-center">{index + 1}</h4>
                  <CustomSelect name={`emailObj:${index}`} handleChange={handleChange} handleSelectChange={handleSelectChange} label="Email Objective" placeholder="Select email objective..." showOthers={false} values={objectives} />
                  <CustomSelect name={`emailTrigger:${index}`} handleChange={handleChange} handleSelectChange={handleSelectChange} label="Trigger" placeholder="Select a trigger..." showOthers={false} values={triggers} />
                </div>
              ))}
            </div>}
          </div>}
          <CustomSelect name="subjectLineGeneration" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Subject line generation" placeholder="Select Yes/No" showOthers={false} values={[{ label: "Yes, generate subject line suggestions", value: "yes" }, { label: "No, I will provide my own subject line", value: "no" }]} />

          {
            formData.subjectLineGeneration === "yes" && <CustomSelect name="subjectLineStyle" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Subject line style" placeholder="Select style" showOthers={false} values={subjectLineStyles} />
          }

          <CustomSelect name="outputFormat" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Output format for email" placeholder="Select ouput format" showOthers={false} values={emailOutputFormats} />

        </div>}

        {formData.contentFormat === "SMS" && (
          <div className="space-y-4">
            <CustomSelect name="smsType" handleChange={handleChange} handleSelectChange={handleSelectChange} label="SMS Type" placeholder="Select SMS Type" showOthers={false} values={[{ label: "Individual SMS", value: "individual" }, { label: "Programmed SMS Sequence", value: "sequence" }]} />
            {formData.smsType === "sequence" && (
              <div className="space-y-4">
                <CustomInput label="Number of SMS in Sequence (2-5)" type="number" handleChange={handleChange} name="smsSequence" min="2" max="5" />
                <CustomInput label="Interval Between SMS (Hours)" type="number" handleChange={handleChange} name="smsInterval" min="1" />
                <CustomSelect name="smsSequenceObj" handleChange={handleChange} handleSelectChange={handleSelectChange} label="SMS sequence objective" placeholder="Select an objective" showOthers={false} values={smsSequenceObjectives} />
              </div>
            )}
          </div>
        )}

        {formData.contentFormat?.includes("Social Media") && (
          <div className="space-y-4">
            <CustomSelect name="hashtagInclusion" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Hashtag Inclusion" placeholder="Select Yes/No" showOthers={false} values={[{ label: "Yes, generate optimized hashtags", value: "yes" }, { label: "No, I will provide my own hashtags", value: "no" }]} />
            {formData.hashtagInclusion === "yes" && (
              <div className="space-y-4">
                <CustomInput label="Number of desired hashtags" type="number" handleChange={handleChange} name="numberOfDesiredHashtags" min="1" max="30" />
              </div>
            )}
          </div>
        )}

        {formData.contentFormat === "Blog article" && (
          <div className="space-y-4">
            <CustomSelect name="articleType" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Article type" placeholder="Select article type" showOthers={false} values={[{ label: "Individual article", value: "individual" }, { label: "Series of articles (sequence)", value: "sequence" }, { label: "Thematic dossier", value: "thematic dossier" }]} />
            {formData.articleType === "sequence" && (
              <div className="space-y-4">
                <CustomInput label="Number of articles in series" type="number" handleChange={handleChange} name="noOfArticlesInSeries" min="2" max="5" />
                <CustomSelect name="seriesStructure" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Series structure" placeholder="Select a structure" showOthers={false} values={seriesStructures} />
              </div>
            )}
            <CustomSelect name="articleStructure" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Article structure" placeholder="Select article structure" showOthers={false} values={articleStructures} />
          </div>
        )}

        <CustomSelect name="writingStyles" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Writing Style/Tone" placeholder="Select a tone..." showOthers={false} values={writingStyles} />

        <CustomSelect name="targetAudiences" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Target Audience/Persons" placeholder="Select a target audience..." showOthers={formData.targetAudiences !== undefined && (formData.targetAudiences === "" || !targetAudiences.find(({ value }) => formData.targetAudiences === value))} values={targetAudiences} />

        <CustomSelect name="communicationObjectives" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Communication Objectives" placeholder="Select communication objectives" showOthers={false} values={communicationObjectives} />

        <CustomSelect name="contentLengths" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Content Length" placeholder="Select content length" showOthers={false} values={contentLengths} />

        <CustomSelect name="elementsToInclude" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Elements to Include" placeholder="Select elements to include" showOthers={false} values={elementsToInclude} isMulti />


        <CustomSelect name="aiModels" handleChange={handleChange} handleSelectChange={handleSelectChange} label="AI Model to Use" placeholder="Select a model" showOthers={false} values={aiModels} />


        <CustomSelect name="urgencyLevels" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Urgency Level" placeholder="Select Urgency Level" showOthers={formData.urgencyLevels !== undefined && (formData.urgencyLevels === "" || !urgencyLevels.find(({ value }) => formData.urgencyLevels === value))} values={urgencyLevels} otherType="date" />

        <label className="block text-sm font-medium text-gray-700">Keywords to include
          <CreatableSelect
            isMulti
            name="keywords"
            onChange={handleSelectChange}
            placeholder="Enter up to 5 keywords..."
            isClearable
            maxMenuHeight={150}
          />
        </label>

        <CustomSelect name="outputFormats" handleChange={handleChange} handleSelectChange={handleSelectChange} label="Output Format" placeholder="Select Output Format" showOthers={false} values={outputFormats} />


        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Submit</button>
      </form>
    </div>
  );
};

export default ContentGenerationForm;
