/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
import { ActionMeta } from "react-select";
import { Layout, TFormData } from "../type";
import CustomSelect from "./select";
import CustomInput from "./input";
import CreatableSelect from "react-select/creatable";
import TemplateDropBox from "./template";
import { FiEye } from "react-icons/fi";
import FormPreviewModal from "./preview";
import AIContentSelector from "./contents";

const MainPage = ({ dict }: { dict: Layout }) => {
    const [formData, setFormData] = useState<TFormData>({});
    const [showPreview, setShowPreview] = useState(false);
    const aiResponses = [
        "This is AI-generated content option 1.",
        "This is AI-generated content option 2.",
        "This is AI-generated content option 3.",
        "This is AI-generated content option 4."
    ];

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData!, [name]: value });
    };

    const handleChangeTextBox = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        setShowPreview(true);
    };

    return <section className="p-6">
        {
            showPreview && <FormPreviewModal formData={formData} onClose={() => setShowPreview(false)} onSubmit={() => []} dict={dict} />
        }
        <TemplateDropBox setFormData={setFormData} dict={dict} />
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-lg bg-white space-y-4"
            >
                <h3 className="text-center text-primary uppercase font-semibold">{dict.form.heading}</h3>
                <label className="block text-sm font-medium text-gray-700">{dict.form.subject.label}
                    <input
                        name="subject"
                        onChange={handleChangeInput}
                        placeholder={dict.form.subject.placeholder}
                        className="w-full p-2 border !text-sm border-gray-300 rounded focus:ring focus:ring-blue-300"
                    />
                </label>
                <label className="block text-sm font-medium text-gray-700">{dict.form.description.label}
                    <textarea
                        name="description"
                        placeholder={dict.form.description.placeholder}
                        onChange={handleChangeTextBox}
                    />
                </label>
                <CustomSelect value={formData.targetCountry} name="targetCountry" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.target_country.label} placeholder={dict.form.target_country.placeholder} showOthers={formData.targetCountry !== undefined && (formData.targetCountry === "" || !dict.data.countries.find(({ value }) => formData.targetCountry === value))} values={dict.data.countries} />
                <CustomSelect value={formData.language} name="language" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.language.label} placeholder={dict.form.language.placeholder} showOthers={formData.language !== undefined && (formData.language === "" || !dict.data.languages.find(({ value }) => formData.language === value))} values={dict.data.languages} />

                <CustomSelect value={formData.contentFormat} name="contentFormat" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.content_format.label} placeholder={dict.form.content_format.placeholder} showOthers={false} values={dict.data.contentFormats} />

                {/* // TODO */}
                {formData.contentFormat === "Email marketing" && <div className="space-y-4">
                    <CustomSelect
                        value={formData.emailType}
                        name="emailType"
                        handleChange={handleChangeInput}
                        handleSelectChange={handleSelectChange}
                        label={dict.form.email_marketting.email_type.label}
                        placeholder={dict.form.email_marketting.email_type.placeholder}
                        showOthers={false}
                        values={[{ label: "Individual Email", value: "individual" }, { label: "Programmed Email Sequence", value: "sequence" }]}
                    />
                    {formData.emailType === "sequence" && <div className="space-y-4">
                        <CustomSelect
                            value={formData.emailSequenceType}
                            name="emailSequenceType"
                            handleChange={handleChangeInput}
                            handleSelectChange={handleSelectChange}
                            label={dict.form.email_marketting.email_sequence_type.label}
                            placeholder={dict.form.email_marketting.email_sequence_type.placeholder}
                            showOthers={false}
                            values={dict.data.emailSequenceTypes}
                        />
                        <CustomInput
                            label={dict.form.email_marketting.no_of_emails_in_seq.label}
                            type="number"
                            handleChange={handleChangeInput}
                            name="noOfEmailsInSeq"
                            min="2"
                            max="10"
                        />
                        <CustomInput
                            label={dict.form.email_marketting.emails_interval.label}
                            type="number"
                            handleChange={handleChangeInput}
                            name="emailsInterval"
                            min="1"
                        />
                        {formData.noOfEmailsInSeq && <div className="space-y-4">
                            {Array.from({ length: parseInt(formData.noOfEmailsInSeq) }).map((_, index) => (
                                <div key={index} className="p-4 border border-[var(--border)] rounded-lg shadow-sm space-y-2">
                                    <h4 className="mb-2 text-center">{index + 1}</h4>
                                    <CustomSelect
                                        name={`emailObj:${index}`}
                                        handleChange={handleChangeInput}
                                        handleSelectChange={handleSelectChange}
                                        label={dict.form.email_marketting.email_objective.label}
                                        placeholder={dict.form.email_marketting.email_objective.placeholder}
                                        showOthers={false}
                                        values={dict.data.objectives}
                                    />
                                    <CustomSelect
                                        name={`emailTrigger:${index}`}
                                        handleChange={handleChangeInput}
                                        handleSelectChange={handleSelectChange}
                                        label={dict.form.email_marketting.email_trigger.label}
                                        placeholder={dict.form.email_marketting.email_trigger.placeholder}
                                        showOthers={false}
                                        values={dict.data.triggers}
                                    />
                                </div>
                            ))}
                        </div>}
                    </div>}
                    <CustomSelect
                        value={formData.subjectLineGeneration}
                        name="subjectLineGeneration"
                        handleChange={handleChangeInput}
                        handleSelectChange={handleSelectChange}
                        label={dict.form.email_marketting.subject_line_generation.label}
                        placeholder={dict.form.email_marketting.subject_line_generation.placeholder}
                        showOthers={false}
                        values={[{ label: "Yes, generate subject line suggestions", value: "yes" }, { label: "No, I will provide my own subject line", value: "no" }]}
                    />
                    {formData.subjectLineGeneration === "yes" && <CustomSelect
                        value={formData.subjectLineStyle}
                        name="subjectLineStyle"
                        handleChange={handleChangeInput}
                        handleSelectChange={handleSelectChange}
                        label={dict.form.email_marketting.subject_line_style.label}
                        placeholder={dict.form.email_marketting.subject_line_style.placeholder}
                        showOthers={false}
                        values={dict.data.subjectLineStyles}
                    />}
                    <CustomSelect
                        value={formData.emailOutputFormat}
                        name="emailOutputFormat"
                        handleChange={handleChangeInput}
                        handleSelectChange={handleSelectChange}
                        label={dict.form.email_marketting.email_output_format.label}
                        placeholder={dict.form.email_marketting.email_output_format.placeholder}
                        showOthers={false}
                        values={dict.data.emailOutputFormats}
                    />
                </div>}


                {formData.contentFormat === "SMS" && (
                    <div className="space-y-4">
                        <CustomSelect
                            value={formData.smsType}
                            name="smsType"
                            handleChange={handleChangeInput}
                            handleSelectChange={handleSelectChange}
                            label={dict.form.sms.sms_type.label}
                            placeholder={dict.form.sms.sms_type.placeholder}
                            showOthers={false}
                            values={[{ label: "Individual SMS", value: "individual" }, { label: "Programmed SMS Sequence", value: "sequence" }]}
                        />
                        {formData.smsType === "sequence" && (
                            <div className="space-y-4">
                                <CustomInput
                                    label={dict.form.sms.sms_sequence.label}
                                    type="number"
                                    handleChange={handleChangeInput}
                                    name="smsSequence"
                                    min="2"
                                    max="5"
                                />
                                <CustomInput
                                    label={dict.form.sms.sms_interval.label}
                                    type="number"
                                    handleChange={handleChangeInput}
                                    name="smsInterval"
                                    min="1"
                                />
                                <CustomSelect
                                    value={formData.smsSequenceObj}
                                    name="smsSequenceObj"
                                    handleChange={handleChangeInput}
                                    handleSelectChange={handleSelectChange}
                                    label={dict.form.sms.sms_sequence_obj.label}
                                    placeholder={dict.form.sms.sms_sequence_obj.placeholder}
                                    showOthers={false}
                                    values={dict.data.smsSequenceObjectives}
                                />
                            </div>
                        )}
                    </div>
                )}

                {formData.contentFormat?.includes("Social Media") && (
                    <div className="space-y-4">
                        <CustomSelect
                            value={formData.hashtagInclusion}
                            name="hashtagInclusion"
                            handleChange={handleChangeInput}
                            handleSelectChange={handleSelectChange}
                            label={dict.form.social_media.hash_tag_inclusion.label}
                            placeholder={dict.form.social_media.hash_tag_inclusion.placeholder}
                            showOthers={false}
                            values={[
                                { label: "Yes, generate optimized hashtags", value: "yes" },
                                { label: "No, I will provide my own hashtags", value: "no" }
                            ]}
                        />
                        {formData.hashtagInclusion === "yes" && (
                            <div className="space-y-4">
                                <CustomInput
                                    label={dict.form.social_media.number_of_desired_hashtags.label}
                                    type="number"
                                    handleChange={handleChangeInput}
                                    name="numberOfDesiredHashtags"
                                    min="1"
                                    max="30"
                                />
                            </div>
                        )}
                    </div>
                )
                }

                {formData.contentFormat === "Blog article" && (
                    <div className="space-y-4">
                        <CustomSelect
                            value={formData.articleType}
                            name="articleType"
                            handleChange={handleChangeInput}
                            handleSelectChange={handleSelectChange}
                            label={dict.form.blog_article.article_type.label}
                            placeholder={dict.form.blog_article.article_type.placeholder}
                            showOthers={false}
                            values={[
                                { label: "Individual article", value: "individual" },
                                { label: "Series of articles (sequence)", value: "sequence" },
                                { label: "Thematic dossier", value: "thematic_dossier" }
                            ]}
                        />
                        {formData.articleType === "sequence" && (
                            <div className="space-y-4">
                                <CustomInput
                                    label={dict.form.blog_article.sequence.label}
                                    type="number"
                                    handleChange={handleChangeInput}
                                    name="noOfArticlesInSeries"
                                    min="2"
                                    max="5"
                                />
                                <CustomSelect
                                    value={formData.seriesStructure}
                                    name="seriesStructure"
                                    handleChange={handleChangeInput}
                                    handleSelectChange={handleSelectChange}
                                    label={dict.form.blog_article.series_structure.label}
                                    placeholder={dict.form.blog_article.series_structure.placeholder}
                                    showOthers={false}
                                    values={dict.data.seriesStructures}
                                />
                            </div>
                        )}
                        <CustomSelect
                            value={formData.articleStructure}
                            name="articleStructure"
                            handleChange={handleChangeInput}
                            handleSelectChange={handleSelectChange}
                            label={dict.form.blog_article.article_structure.label}
                            placeholder={dict.form.blog_article.article_structure.placeholder}
                            showOthers={false}
                            values={dict.data.articleStructures}
                        />
                    </div>
                )}

                <CustomSelect value={formData.writingStyles} name="writingStyles" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.writing_style.label} placeholder={dict.form.writing_style.placeholder} showOthers={false} values={dict.data.writingStyles} />

                <CustomSelect value={formData.targetAudiences} name="targetAudiences" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.target_audience.label} placeholder={dict.form.target_audience.placeholder} showOthers={formData.targetAudiences !== undefined && (formData.targetAudiences === "" || !dict.data.targetAudiences.find(({ value }) => formData.targetAudiences === value))} values={dict.data.targetAudiences} />

                <CustomSelect value={formData.communicationObjectives} name="communicationObjectives" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.communication_objectives.label} placeholder={dict.form.communication_objectives.placeholder} showOthers={false} values={dict.data.communicationObjectives} />

                <CustomSelect value={formData.contentLengths} name="contentLengths" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.content_length.label} placeholder={dict.form.content_length.placeholder} showOthers={false} values={dict.data.contentLengths} />

                <CustomSelect value={formData.elementsToInclude} name="elementsToInclude" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.elements_to_include.label} placeholder={dict.form.elements_to_include.placeholder} showOthers={false} values={dict.data.elementsToInclude} isMulti />

                <CustomSelect value={formData.aiModels} name="aiModels" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.ai_model.label} placeholder={dict.form.ai_model.placeholder} showOthers={false} values={dict.data.aiModels} />

                <CustomSelect value={formData.urgencyLevels} name="urgencyLevels" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.urgency_level.label} placeholder={dict.form.urgency_level.placeholder} showOthers={formData.urgencyLevels !== undefined && (formData.urgencyLevels === "" || !dict.data.urgencyLevels.find(({ value }) => formData.urgencyLevels === value))} values={dict.data.urgencyLevels} otherType="date" />

                <label className="block text-sm font-medium text-gray-700">{dict.form.keywords.label}
                    <CreatableSelect
                        isMulti
                        name="keywords"
                        onChange={handleSelectChange}
                        placeholder={dict.form.keywords.placeholder}
                        isClearable
                        maxMenuHeight={150}
                        value={formData.keywords?.map((v) => { return { label: v, value: v } })}
                    />
                </label>

                <CustomSelect value={formData.outputFormats} name="outputFormats" handleChange={handleChangeInput} handleSelectChange={handleSelectChange} label={dict.form.output_format.label} placeholder={dict.form.output_format.placeholder} showOthers={false} values={dict.data.outputFormats} />


                <button type="submit" className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"><FiEye />{dict.preview}</button>
            </form>
        </div>
        <AIContentSelector aiResponses={aiResponses} dict={dict} />
    </section>
};

export default MainPage;
