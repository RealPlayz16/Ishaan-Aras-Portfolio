import { useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  Linkedin,
  Send,
  Download,
} from "lucide-react";
import { email, linkedIn, projects, skillGroups } from "@/lib/portfolio";
import { experience } from "@/lib/hardware";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [subject, setSubject] = useState("Let’s build something");
  const [message, setMessage] = useState("");
  const downloadProfile = () => {
    const text = `ISHAAN ARAS — PORTFOLIO OVERVIEW\n\nMechatronics Engineering, University of Waterloo\nEmbedded systems, robotics, and edge AI.\nCo-op stream 4 · 1A term\nEmbedded Systems Intern @ Fostride\nUW Formula Electric · Tractive & Electrical\nOpen to W2027 co-op opportunities.\n\nEXPERIENCE\n${experience.map(e => `${e.title} — ${e.subtitle}\n${e.details.map(d => "- " + d).join("\n")}`).join("\n\n")}\n\nCONTACT\n${email}\n${linkedIn}\n\nSKILLS\n${skillGroups.map(g => `${g.name}: ${g.items.join(", ")}`).join("\n")}\n\nPROJECTS\n${projects.map(p => `${p.name}\n${p.description}\n${p.highlights.map(h => "- " + h).join("\n")}\nStack: ${p.tags.join(", ")}`).join("\n\n")}\n\nRECOGNITION\n3x OSHWA certified open-source hardware\nSmart India Hackathon finalist\nPublished research in embedded AI systems\n\nThis is a portfolio overview, not a formal resume.\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ishaan-Aras-Portfolio.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Ishaan,\n\n${message}\n\nBest,\n${name}\n${replyTo}`)}`;
  return (
    <div className="contact-app">
      <div className="app-page-header">
        <div className="eyebrow">GOOD THINGS START WITH A CONVERSATION</div>
        <h2>
          Let’s connect<span>.</span>
        </h2>
        <p>
          Have an idea, a question, or a co-op opportunity? My inbox is open.
        </p>
        <div className="availability">
          <span className="status-dot" /> Available for W2027 co-op
        </div>
      </div>
      <div className="contact-layout">
        <div className="contact-links">
          <span className="section-label">FIND ME HERE</span>
          <a className="contact-link" href={`mailto:${email}`}>
            <Mail size={20} />
            <span>
              <small>EMAIL</small>
              {email}
            </span>
            <ArrowUpRight size={17} />
          </a>
          <button
            className="copy-email"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(email);
                setCopied(true);
                setCopyError(false);
                setTimeout(() => setCopied(false), 2200);
              } catch {
                setCopyError(true);
              }
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
            {copied ? "Email copied" : "Copy email address"}
          </button>
          {copyError && (
            <p className="form-note" role="status">
              Clipboard unavailable. You can select and copy the email above.
            </p>
          )}
          <a
            className="contact-link"
            href={linkedIn}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={20} />
            <span>
              <small>LINKEDIN</small>Ishaan Aras
            </span>
            <ArrowUpRight size={17} />
          </a>
          <div className="contact-note">
            <span className="section-label">LOOKING FOR</span>
            <p>
              Embedded systems.
              <br />
              Robotics. Hardware engineering.
              <br />
              People who like building things.
            </p>
          </div>
          <button className="download-btn" onClick={downloadProfile}>
            <Download size={16} />
            <span>
              Download portfolio overview
              <small>Plain text · not a formal résumé</small>
            </span>
          </button>
        </div>
        <form
          className="contact-form"
          onSubmit={e => {
            e.preventDefault();
            if (!name.trim() || !message.trim() || !subject.trim()) return;
            window.location.href = mailHref;
            setPrepared(true);
          }}
        >
          <div className="compose-title">
            <span className="status-dot" /> NEW MESSAGE <span>to: {email}</span>
          </div>
          <label>
            Your name
            <input
              required
              maxLength={100}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setPrepared(false);
              }}
              placeholder="Ada Lovelace"
            />
          </label>
          <label>
            Your email
            <input
              type="email"
              required
              maxLength={200}
              value={replyTo}
              onChange={e => {
                setReplyTo(e.target.value);
                setPrepared(false);
              }}
              placeholder="ada@example.com"
            />
          </label>
          <label>
            Subject
            <input
              required
              maxLength={150}
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
                setPrepared(false);
              }}
            />
          </label>
          <label>
            Message
            <textarea
              required
              maxLength={5000}
              rows={4}
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                setPrepared(false);
              }}
              placeholder="Tell me what you have in mind…"
            />
          </label>
          <button className="primary-btn" type="submit">
            Open in email app <Send size={15} />
          </button>
          <p className="form-note">
            Opens your email app with a draft. Nothing is sent or stored by this
            website.
          </p>
          {prepared && (
            <div className="form-success" role="status">
              <Check size={16} />
              <span>
                Your email draft is ready. If no app opened,{" "}
                <a href={mailHref}>open the draft again</a> or email me
                directly.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
