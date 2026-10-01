import { useState } from "react";
import "./CVBuilder.css";

const emptyExperience = {
  jobTitle: "",
  company: "",
  location: "",
  start: "",
  end: "",
  description: "",
};

const emptyEducation = {
  degree: "",
  school: "",
  location: "",
  year: "",
  description: "",
};

const emptyProject = {
  name: "",
  role: "",
  link: "",
  description: "",
};

const emptyCertification = {
  name: "",
  organization: "",
  year: "",
};

const emptyAward = {
  name: "",
  organization: "",
  year: "",
};

const emptyLanguage = {
  name: "",
  level: "Intermediate",
};

function CVBuilder() {
  const [template, setTemplate] = useState("modern");
  const [color, setColor] = useState("#2563eb");

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const [data, setData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",

    skills: "",

    interests: "",
    references: "",

    declaration: "",
    place: "",
    date: "",
  });

  const [experiences, setExperiences] = useState([
    { ...emptyExperience },
  ]);

  const [education, setEducation] = useState([
    { ...emptyEducation },
  ]);

  const [projects, setProjects] = useState([
    { ...emptyProject },
  ]);

  const [certifications, setCertifications] = useState([
    { ...emptyCertification },
  ]);

  const [awards, setAwards] = useState([
    { ...emptyAward },
  ]);

  const [languages, setLanguages] = useState([
    { ...emptyLanguage },
  ]);

  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArray = (setter, index, field, value) => {
    setter((items) =>
      items.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addItem = (setter, emptyItem) => {
    setter((items) => [
      ...items,
      { ...emptyItem },
    ]);
  };

  const removeItem = (setter, index) => {
    setter((items) =>
      items.filter((_, i) => i !== index)
    );
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhoto(URL.createObjectURL(file));
  };

  const handleSignature = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image signature.");
      return;
    }

    setSignature(URL.createObjectURL(file));
  };

  const downloadPDF = () => {
    window.print();
  };

  const hasContent = (value) =>
    value && value.trim();

  return (
    <div className="cv-builder-premium">

      {/* ================= LEFT EDITOR ================= */}

      <aside className="cv-editor-premium">

        <div className="cv-builder-title">

          <span className="tool-badge">
            TOOLORA TOOL
          </span>

          <h1>
            Professional CV Builder
          </h1>

          <p>
            Build a polished, professional resume
            in minutes.
          </p>

        </div>


        {/* Templates */}

        <div className="cv-control">

          <div className="cv-control-heading">
            <div>
              <h3>Choose Template</h3>
              <p>Select a design for your resume.</p>
            </div>
          </div>

          <div className="cv-template-grid">

            {[
              ["modern", "Modern Pro"],
              ["ats", "ATS Professional"],
              ["classic", "Classic Executive"],
              ["creative", "Creative"],
              ["fresher", "Fresher"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={
                  template === value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTemplate(value)
                }
              >
                <span
                  className={`template-mini ${value}`}
                ></span>

                {label}
              </button>
            ))}

          </div>

        </div>


        {/* Color */}

        <div className="cv-control">

          <h3>Accent Color</h3>

          <div className="cv-colors">

            {[
              "#2563eb",
              "#7c3aed",
              "#059669",
              "#dc2626",
              "#ea580c",
              "#111827",
            ].map((item) => (
              <button
                key={item}
                className={
                  color === item
                    ? "selected"
                    : ""
                }
                style={{
                  background: item,
                }}
                onClick={() =>
                  setColor(item)
                }
              />
            ))}

            <input
              type="color"
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
              }
            />

          </div>

        </div>


        {/* Photo */}

        <div className="cv-control">

          <h3>Profile Photo</h3>

          <label className="cv-file-upload">

            <span>
              {photo
                ? "Change Profile Photo"
                : "Upload Profile Photo"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
            />

          </label>

          {photo && (
            <button
              className="small-remove"
              onClick={() =>
                setPhoto(null)
              }
            >
              Remove Photo
            </button>
          )}

        </div>


        {/* Personal */}

        <div className="cv-control">

          <h3>Personal Information</h3>

          <div className="cv-form-grid">

            <input
              value={data.name}
              placeholder="Full Name"
              onChange={(e) =>
                update("name", e.target.value)
              }
            />

            <input
              value={data.title}
              placeholder="Professional Title"
              onChange={(e) =>
                update("title", e.target.value)
              }
            />

            <input
              value={data.email}
              placeholder="Email Address"
              onChange={(e) =>
                update("email", e.target.value)
              }
            />

            <input
              value={data.phone}
              placeholder="Phone Number"
              onChange={(e) =>
                update("phone", e.target.value)
              }
            />

            <input
              value={data.location}
              placeholder="City, Country"
              onChange={(e) =>
                update("location", e.target.value)
              }
            />

            <input
              value={data.website}
              placeholder="Portfolio / Website"
              onChange={(e) =>
                update("website", e.target.value)
              }
            />

            <input
              value={data.linkedin}
              placeholder="LinkedIn URL"
              onChange={(e) =>
                update("linkedin", e.target.value)
              }
            />

            <input
              value={data.github}
              placeholder="GitHub URL"
              onChange={(e) =>
                update("github", e.target.value)
              }
            />

          </div>

        </div>


        {/* Summary */}

        <div className="cv-control">

          <h3>Professional Summary</h3>

          <textarea
            value={data.summary}
            onChange={(e) =>
              update("summary", e.target.value)
            }
            placeholder="Write a short professional summary..."
          />

        </div>


        {/* Experience */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Work Experience</h3>
              <p>Add your professional experience.</p>
            </div>

            <button
              onClick={() =>
                addItem(
                  setExperiences,
                  emptyExperience
                )
              }
            >
              + Add
            </button>

          </div>

          {experiences.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="repeatable-top">

                <span>
                  Experience {index + 1}
                </span>

                {experiences.length > 1 && (
                  <button
                    onClick={() =>
                      removeItem(
                        setExperiences,
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}

              </div>

              <input
                placeholder="Job Title"
                value={item.jobTitle}
                onChange={(e) =>
                  updateArray(
                    setExperiences,
                    index,
                    "jobTitle",
                    e.target.value
                  )
                }
              />

              <div className="cv-form-grid">

                <input
                  placeholder="Company"
                  value={item.company}
                  onChange={(e) =>
                    updateArray(
                      setExperiences,
                      index,
                      "company",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Location"
                  value={item.location}
                  onChange={(e) =>
                    updateArray(
                      setExperiences,
                      index,
                      "location",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Start Date"
                  value={item.start}
                  onChange={(e) =>
                    updateArray(
                      setExperiences,
                      index,
                      "start",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="End Date / Present"
                  value={item.end}
                  onChange={(e) =>
                    updateArray(
                      setExperiences,
                      index,
                      "end",
                      e.target.value
                    )
                  }
                />

              </div>

              <textarea
                placeholder="Responsibilities and achievements..."
                value={item.description}
                onChange={(e) =>
                  updateArray(
                    setExperiences,
                    index,
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>


        {/* Education */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Education</h3>
              <p>Add your academic background.</p>
            </div>

            <button
              onClick={() =>
                addItem(
                  setEducation,
                  emptyEducation
                )
              }
            >
              + Add
            </button>

          </div>

          {education.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="repeatable-top">

                <span>
                  Education {index + 1}
                </span>

                {education.length > 1 && (
                  <button
                    onClick={() =>
                      removeItem(
                        setEducation,
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}

              </div>

              <input
                placeholder="Degree / Qualification"
                value={item.degree}
                onChange={(e) =>
                  updateArray(
                    setEducation,
                    index,
                    "degree",
                    e.target.value
                  )
                }
              />

              <div className="cv-form-grid">

                <input
                  placeholder="School / College"
                  value={item.school}
                  onChange={(e) =>
                    updateArray(
                      setEducation,
                      index,
                      "school",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Location"
                  value={item.location}
                  onChange={(e) =>
                    updateArray(
                      setEducation,
                      index,
                      "location",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Year"
                  value={item.year}
                  onChange={(e) =>
                    updateArray(
                      setEducation,
                      index,
                      "year",
                      e.target.value
                    )
                  }
                />

              </div>

              <textarea
                placeholder="Details / achievements..."
                value={item.description}
                onChange={(e) =>
                  updateArray(
                    setEducation,
                    index,
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>


        {/* Skills */}

        <div className="cv-control">

          <h3>Skills</h3>

          <textarea
            value={data.skills}
            onChange={(e) =>
              update("skills", e.target.value)
            }
            placeholder="Communication, Leadership, MS Office, Sales..."
          />

          <small className="field-help">
            Separate skills with commas.
          </small>

        </div>


        {/* Projects */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Projects</h3>
              <p>Showcase important projects.</p>
            </div>

            <button
              onClick={() =>
                addItem(
                  setProjects,
                  emptyProject
                )
              }
            >
              + Add
            </button>

          </div>

          {projects.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="repeatable-top">

                <span>
                  Project {index + 1}
                </span>

                {projects.length > 1 && (
                  <button
                    onClick={() =>
                      removeItem(
                        setProjects,
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}

              </div>

              <input
                placeholder="Project Name"
                value={item.name}
                onChange={(e) =>
                  updateArray(
                    setProjects,
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              <div className="cv-form-grid">

                <input
                  placeholder="Your Role"
                  value={item.role}
                  onChange={(e) =>
                    updateArray(
                      setProjects,
                      index,
                      "role",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Project Link"
                  value={item.link}
                  onChange={(e) =>
                    updateArray(
                      setProjects,
                      index,
                      "link",
                      e.target.value
                    )
                  }
                />

              </div>

              <textarea
                placeholder="Describe the project..."
                value={item.description}
                onChange={(e) =>
                  updateArray(
                    setProjects,
                    index,
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>


        {/* Certifications */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Certifications</h3>
              <p>Courses and professional certificates.</p>
            </div>

            <button
              onClick={() =>
                addItem(
                  setCertifications,
                  emptyCertification
                )
              }
            >
              + Add
            </button>

          </div>

          {certifications.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="repeatable-top">

                <span>
                  Certification {index + 1}
                </span>

                {certifications.length > 1 && (
                  <button
                    onClick={() =>
                      removeItem(
                        setCertifications,
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}

              </div>

              <input
                placeholder="Certificate Name"
                value={item.name}
                onChange={(e) =>
                  updateArray(
                    setCertifications,
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              <div className="cv-form-grid">

                <input
                  placeholder="Organization"
                  value={item.organization}
                  onChange={(e) =>
                    updateArray(
                      setCertifications,
                      index,
                      "organization",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Year"
                  value={item.year}
                  onChange={(e) =>
                    updateArray(
                      setCertifications,
                      index,
                      "year",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          ))}

        </div>


        {/* Languages */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Languages</h3>
              <p>Add languages and proficiency.</p>
            </div>

            <button
              onClick={() =>
                addItem(
                  setLanguages,
                  emptyLanguage
                )
              }
            >
              + Add
            </button>

          </div>

          {languages.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="cv-form-grid">

                <input
                  placeholder="Language"
                  value={item.name}
                  onChange={(e) =>
                    updateArray(
                      setLanguages,
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />

                <select
                  value={item.level}
                  onChange={(e) =>
                    updateArray(
                      setLanguages,
                      index,
                      "level",
                      e.target.value
                    )
                  }
                >
                  <option>Basic</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>

              </div>

              {languages.length > 1 && (
                <button
                  className="inline-remove"
                  onClick={() =>
                    removeItem(
                      setLanguages,
                      index
                    )
                  }
                >
                  Remove
                </button>
              )}

            </div>

          ))}

        </div>


        {/* Awards */}

        <div className="cv-control">

          <div className="section-editor-heading">

            <div>
              <h3>Achievements & Awards</h3>
            </div>

            <button
              onClick={() =>
                addItem(
                  setAwards,
                  emptyAward
                )
              }
            >
              + Add
            </button>

          </div>

          {awards.map((item, index) => (

            <div
              className="repeatable-card"
              key={index}
            >

              <div className="cv-form-grid">

                <input
                  placeholder="Award / Achievement"
                  value={item.name}
                  onChange={(e) =>
                    updateArray(
                      setAwards,
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Organization"
                  value={item.organization}
                  onChange={(e) =>
                    updateArray(
                      setAwards,
                      index,
                      "organization",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Year"
                  value={item.year}
                  onChange={(e) =>
                    updateArray(
                      setAwards,
                      index,
                      "year",
                      e.target.value
                    )
                  }
                />

              </div>

              {awards.length > 1 && (
                <button
                  className="inline-remove"
                  onClick={() =>
                    removeItem(
                      setAwards,
                      index
                    )
                  }
                >
                  Remove
                </button>
              )}

            </div>

          ))}

        </div>


        {/* Interests */}

        <div className="cv-control">

          <h3>Interests</h3>

          <input
            value={data.interests}
            onChange={(e) =>
              update(
                "interests",
                e.target.value
              )
            }
            placeholder="Photography, Travel, Fitness..."
          />

        </div>


        {/* References */}

        <div className="cv-control">

          <h3>References</h3>

          <textarea
            value={data.references}
            onChange={(e) =>
              update(
                "references",
                e.target.value
              )
            }
            placeholder="Reference name, position, company, contact..."
          />

        </div>


        {/* Declaration */}

        <div className="cv-control">

          <h3>Declaration</h3>

          <textarea
            value={data.declaration}
            onChange={(e) =>
              update(
                "declaration",
                e.target.value
              )
            }
            placeholder="I hereby declare that the information provided above is true and correct..."
          />

        </div>


        {/* Signature */}

        <div className="cv-control">

          <h3>Signature</h3>

          <label className="cv-file-upload">

            <span>
              {signature
                ? "Change Signature"
                : "Upload Signature"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleSignature}
            />

          </label>

          {signature && (
            <div className="signature-editor-preview">

              <img
                src={signature}
                alt="Signature"
              />

              <button
                className="small-remove"
                onClick={() =>
                  setSignature(null)
                }
              >
                Remove Signature
              </button>

            </div>
          )}

          <div className="cv-form-grid">

            <input
              value={data.place}
              placeholder="Place"
              onChange={(e) =>
                update(
                  "place",
                  e.target.value
                )
              }
            />

            <input
              value={data.date}
              placeholder="Date"
              onChange={(e) =>
                update(
                  "date",
                  e.target.value
                )
              }
            />

          </div>

        </div>


        {/* Download */}

        <button
          className="cv-download-main"
          onClick={downloadPDF}
        >
          Download Resume PDF
          <span>↓</span>
        </button>

      </aside>


      {/* ================= PREVIEW ================= */}

      <main className="cv-preview-area">

        <div className="cv-preview-top">

          <div>
            <span>LIVE PREVIEW</span>
            <h2>Your Resume</h2>
          </div>

          <button
            onClick={downloadPDF}
          >
            Download PDF
          </button>

        </div>


        <div
          className={`premium-resume ${template}`}
          style={{
            "--accent": color,
          }}
        >

          {/* ================= MODERN ================= */}

          {template === "modern" && (
            <>
              <div className="resume-modern-header">

                {photo && (
                  <img
                    src={photo}
                    className="resume-photo"
                    alt="Profile"
                  />
                )}

                <div>
                  <h1>
                    {data.name ||
                      "Your Name"}
                  </h1>

                  <h2>
                    {data.title ||
                      "Professional Title"}
                  </h2>

                  <div className="resume-contact">
                    {data.email && (
                      <span>
                        {data.email}
                      </span>
                    )}

                    {data.phone && (
                      <span>
                        {data.phone}
                      </span>
                    )}

                    {data.location && (
                      <span>
                        {data.location}
                      </span>
                    )}
                  </div>

                  <div className="resume-links">
                    {data.website && (
                      <span>
                        {data.website}
                      </span>
                    )}

                    {data.linkedin && (
                      <span>
                        {data.linkedin}
                      </span>
                    )}

                    {data.github && (
                      <span>
                        {data.github}
                      </span>
                    )}
                  </div>

                </div>

              </div>


              <div className="modern-body">

                <div>

                  {hasContent(data.summary) && (
                    <ResumeSection
                      title="Profile"
                      content={data.summary}
                    />
                  )}

                  <ExperiencePreview
                    items={experiences}
                  />

                  <EducationPreview
                    items={education}
                  />

                  <ProjectsPreview
                    items={projects}
                  />

                  <CertificationPreview
                    items={certifications}
                  />

                  <AwardsPreview
                    items={awards}
                  />

                </div>


                <aside>

                  <SkillsPreview
                    value={data.skills}
                  />

                  <LanguagesPreview
                    items={languages}
                  />

                  {hasContent(
                    data.interests
                  ) && (
                    <ResumeSection
                      title="Interests"
                      content={data.interests}
                    />
                  )}

                </aside>

              </div>
            </>
          )}


          {/* ================= ATS ================= */}

          {template === "ats" && (
            <div className="ats-template">

              <div className="ats-header">

                <h1>
                  {data.name ||
                    "Your Name"}
                </h1>

                <h2>
                  {data.title ||
                    "Professional Title"}
                </h2>

                <p>
                  {[
                    data.email,
                    data.phone,
                    data.location,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>

                <p>
                  {[
                    data.website,
                    data.linkedin,
                    data.github,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>

              </div>

              {hasContent(data.summary) && (
                <ResumeSection
                  title="Professional Summary"
                  content={data.summary}
                />
              )}

              <ExperiencePreview
                items={experiences}
              />

              <EducationPreview
                items={education}
              />

              <SkillsPreview
                value={data.skills}
              />

              <ProjectsPreview
                items={projects}
              />

              <CertificationPreview
                items={certifications}
              />

              <LanguagesPreview
                items={languages}
              />

              <AwardsPreview
                items={awards}
              />

            </div>
          )}


          {/* ================= CLASSIC ================= */}

          {template === "classic" && (
            <div className="classic-template">

              <div className="classic-header">

                {photo && (
                  <img
                    src={photo}
                    className="resume-photo"
                    alt="Profile"
                  />
                )}

                <div>

                  <h1>
                    {data.name ||
                      "Your Name"}
                  </h1>

                  <h2>
                    {data.title ||
                      "Professional Title"}
                  </h2>

                  <p>
                    {[
                      data.email,
                      data.phone,
                      data.location,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                </div>

              </div>

              <div className="classic-divider"></div>

              {hasContent(data.summary) && (
                <ResumeSection
                  title="Professional Summary"
                  content={data.summary}
                />
              )}

              <ExperiencePreview
                items={experiences}
              />

              <EducationPreview
                items={education}
              />

              <ProjectsPreview
                items={projects}
              />

              <SkillsPreview
                value={data.skills}
              />

              <LanguagesPreview
                items={languages}
              />

              <CertificationPreview
                items={certifications}
              />

            </div>
          )}


          {/* ================= CREATIVE ================= */}

          {template === "creative" && (
            <div className="creative-template">

              <div className="creative-sidebar">

                {photo && (
                  <img
                    src={photo}
                    className="creative-photo"
                    alt="Profile"
                  />
                )}

                <h1>
                  {data.name ||
                    "Your Name"}
                </h1>

                <h2>
                  {data.title ||
                    "Professional Title"}
                </h2>

                <div className="creative-contact">

                  {data.email && (
                    <span>
                      {data.email}
                    </span>
                  )}

                  {data.phone && (
                    <span>
                      {data.phone}
                    </span>
                  )}

                  {data.location && (
                    <span>
                      {data.location}
                    </span>
                  )}

                </div>

                <SkillsPreview
                  value={data.skills}
                  dark
                />

                <LanguagesPreview
                  items={languages}
                  dark
                />

              </div>


              <div className="creative-main">

                {hasContent(data.summary) && (
                  <ResumeSection
                    title="Profile"
                    content={data.summary}
                  />
                )}

                <ExperiencePreview
                  items={experiences}
                />

                <EducationPreview
                  items={education}
                />

                <ProjectsPreview
                  items={projects}
                />

                <CertificationPreview
                  items={certifications}
                />

                <AwardsPreview
                  items={awards}
                />

              </div>

            </div>
          )}


          {/* ================= FRESHER ================= */}

          {template === "fresher" && (
            <div className="fresher-template">

              <div className="fresher-header">

                {photo && (
                  <img
                    src={photo}
                    className="resume-photo"
                    alt="Profile"
                  />
                )}

                <div>

                  <h1>
                    {data.name ||
                      "Your Name"}
                  </h1>

                  <h2>
                    {data.title ||
                      "Student / Fresher"}
                  </h2>

                  <p>
                    {[
                      data.email,
                      data.phone,
                      data.location,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                </div>

              </div>

              {hasContent(data.summary) && (
                <ResumeSection
                  title="Career Objective"
                  content={data.summary}
                />
              )}

              <EducationPreview
                items={education}
              />

              <SkillsPreview
                value={data.skills}
              />

              <ProjectsPreview
                items={projects}
              />

              <CertificationPreview
                items={certifications}
              />

              <LanguagesPreview
                items={languages}
              />

              <AwardsPreview
                items={awards}
              />

            </div>
          )}


          {/* Declaration / Signature */}

          {(hasContent(data.declaration) ||
            signature ||
            data.place ||
            data.date) && (

            <div className="resume-footer">

              {hasContent(data.declaration) && (
                <div className="declaration">
                  <h3>
                    Declaration
                  </h3>

                  <p>
                    {data.declaration}
                  </p>
                </div>
              )}

              <div className="signature-row">

                <div>

                  {signature && (
                    <img
                      src={signature}
                      className="resume-signature"
                      alt="Signature"
                    />
                  )}

                  {data.name && (
                    <strong>
                      {data.name}
                    </strong>
                  )}

                </div>

                <div className="place-date">

                  {data.place && (
                    <span>
                      Place: {data.place}
                    </span>
                  )}

                  {data.date && (
                    <span>
                      Date: {data.date}
                    </span>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PREVIEW COMPONENTS
========================================================= */

function ResumeSection({
  title,
  content,
}) {
  if (!content?.trim()) return null;

  return (
    <section className="resume-section">

      <h3>{title}</h3>

      <p className="multiline">
        {content}
      </p>

    </section>
  );
}


function ExperiencePreview({ items }) {
  const valid = items.filter(
    (item) =>
      item.jobTitle ||
      item.company ||
      item.description
  );

  if (!valid.length) return null;

  return (
    <section className="resume-section">

      <h3>Experience</h3>

      {valid.map((item, index) => (

        <div
          className="experience-preview"
          key={index}
        >

          <div className="preview-entry-top">

            <strong>
              {item.jobTitle ||
                "Job Title"}
            </strong>

            {(item.start ||
              item.end) && (
              <span>
                {item.start}
                {item.start &&
                item.end
                  ? " – "
                  : ""}
                {item.end}
              </span>
            )}

          </div>

          {(item.company ||
            item.location) && (
            <div className="entry-company">
              {[
                item.company,
                item.location,
              ]
                .filter(Boolean)
                .join(" • ")}
            </div>
          )}

          {item.description && (
            <p className="multiline">
              {item.description}
            </p>
          )}

        </div>

      ))}

    </section>
  );
}


function EducationPreview({ items }) {
  const valid = items.filter(
    (item) =>
      item.degree ||
      item.school ||
      item.description
  );

  if (!valid.length) return null;

  return (
    <section className="resume-section">

      <h3>Education</h3>

      {valid.map((item, index) => (

        <div
          className="experience-preview"
          key={index}
        >

          <div className="preview-entry-top">

            <strong>
              {item.degree ||
                "Qualification"}
            </strong>

            {item.year && (
              <span>
                {item.year}
              </span>
            )}

          </div>

          {(item.school ||
            item.location) && (
            <div className="entry-company">
              {[
                item.school,
                item.location,
              ]
                .filter(Boolean)
                .join(" • ")}
            </div>
          )}

          {item.description && (
            <p className="multiline">
              {item.description}
            </p>
          )}

        </div>

      ))}

    </section>
  );
}


function ProjectsPreview({ items }) {
  const valid = items.filter(
    (item) =>
      item.name ||
      item.description
  );

  if (!valid.length) return null;

  return (
    <section className="resume-section">

      <h3>Projects</h3>

      {valid.map((item, index) => (

        <div
          className="experience-preview"
          key={index}
        >

          <div className="preview-entry-top">

            <strong>
              {item.name ||
                "Project"}
            </strong>

            {item.role && (
              <span>
                {item.role}
              </span>
            )}

          </div>

          {item.link && (
            <div className="entry-company">
              {item.link}
            </div>
          )}

          {item.description && (
            <p className="multiline">
              {item.description}
            </p>
          )}

        </div>

      ))}

    </section>
  );
}


function CertificationPreview({
  items,
}) {
  const valid = items.filter(
    (item) =>
      item.name ||
      item.organization
  );

  if (!valid.length) return null;

  return (
    <section className="resume-section">

      <h3>Certifications</h3>

      {valid.map((item, index) => (

        <div
          className="compact-entry"
          key={index}
        >

          <strong>
            {item.name}
          </strong>

          <span>
            {[
              item.organization,
              item.year,
            ]
              .filter(Boolean)
              .join(" • ")}
          </span>

        </div>

      ))}

    </section>
  );
}


function AwardsPreview({ items }) {
  const valid = items.filter(
    (item) =>
      item.name ||
      item.organization
  );

  if (!valid.length) return null;

  return (
    <section className="resume-section">

      <h3>Achievements & Awards</h3>

      {valid.map((item, index) => (

        <div
          className="compact-entry"
          key={index}
        >

          <strong>
            {item.name}
          </strong>

          <span>
            {[
              item.organization,
              item.year,
            ]
              .filter(Boolean)
              .join(" • ")}
          </span>

        </div>

      ))}

    </section>
  );
}


function SkillsPreview({
  value,
  dark = false,
}) {
  if (!value?.trim()) return null;

  const skills = value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <section
      className={`resume-section skills-section ${
        dark ? "dark-section" : ""
      }`}
    >

      <h3>Skills</h3>

      <div className="skill-tags">

        {skills.map((skill, index) => (
          <span key={index}>
            {skill}
          </span>
        ))}

      </div>

    </section>
  );
}


function LanguagesPreview({
  items,
  dark = false,
}) {
  const valid = items.filter(
    (item) => item.name
  );

  if (!valid.length) return null;

  return (
    <section
      className={`resume-section ${
        dark ? "dark-section" : ""
      }`}
    >

      <h3>Languages</h3>

      {valid.map((item, index) => (

        <div
          className="language-row"
          key={index}
        >

          <span>
            {item.name}
          </span>

          <small>
            {item.level}
          </small>

        </div>

      ))}

    </section>
  );
}

export default CVBuilder;