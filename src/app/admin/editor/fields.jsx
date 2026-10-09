"use client"

import { createContext, createElement, useContext, useEffect, useId, useRef, useState } from "react"
import {
  FaArrowUp, FaArrowDown, FaTrashCan, FaPlus, FaChevronDown, FaChevronRight,
  FaUpload, FaImage, FaCopy, FaArrowUpRightFromSquare, FaXmark, FaCircleInfo, FaLink,
} from "react-icons/fa6"
import { ICONS, ICON_OPTIONS, getIcon } from "@/app/lib/content/icons"
import { getAt, slugify, uniqueSlug } from "./utils"

// Shared editor state for all fields (see AdminApp.jsx).
export const EditorContext = createContext(null)
const useEditor = () => useContext(EditorContext)

// ── Small building blocks ─────────────────────

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2d8fdd] focus:ring-2 focus:ring-[#2d8fdd]/20 placeholder:text-slate-400"

const iconBtn =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30"

const widthCls = { xs: "sm:col-span-3", sm: "sm:col-span-6", md: "sm:col-span-8" }

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-slate-700">
      {children}
    </label>
  )
}

function Help({ children }) {
  if (!children) return null
  return <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{children}</p>
}

function FieldShell({ field, id, children }) {
  return (
    <div className={`col-span-12 ${widthCls[field.width] || ""}`}>
      {field.label && <Label htmlFor={id}>{field.label}</Label>}
      {children}
      <Help>{field.help}</Help>
    </div>
  )
}

const useFieldId = useId

// ── Field renderer ────────────────────────────

export function Fields({ fields, basePath }) {
  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-5">
      {fields.map((field, i) => (
        <Field key={`${field.key || field.label}-${i}`} field={field} basePath={basePath} />
      ))}
    </div>
  )
}

function Field({ field, basePath }) {
  const { content, update } = useEditor()

  if (field.type === "subheading") {
    return (
      <div className="col-span-12 -mb-1 mt-2 flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b08d2e]">{field.label}</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
    )
  }

  if (field.type === "group") {
    const path = field.key ? [...basePath, field.key] : basePath
    return (
      <div className="col-span-12 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="mb-3 text-[13px] font-bold text-slate-800">{field.label}</div>
        {field.preview === "heroTitle" && <HeroTitlePreview hero={getAt(content, path)} />}
        <Fields fields={field.fields} basePath={path} />
        <Help>{field.help}</Help>
      </div>
    )
  }

  const path = [...basePath, field.key]
  const value = getAt(content, path)
  const onChange = (v) => update(path, v)
  const Comp = FIELD_TYPES[field.type] || TextField
  return <Comp field={field} value={value} onChange={onChange} path={path} />
}

// ── Simple inputs ─────────────────────────────

function TextField({ field, value, onChange }) {
  const id = useFieldId()
  return (
    <FieldShell field={field} id={id}>
      <input id={id} type="text" className={inputCls} value={value ?? ""} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
    </FieldShell>
  )
}

function TextareaField({ field, value, onChange }) {
  const id = useFieldId()
  return (
    <FieldShell field={field} id={id}>
      <textarea
        id={id}
        rows={field.rows || 3}
        className={`${inputCls} resize-y leading-relaxed`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  )
}

function NumberField({ field, value, onChange }) {
  const id = useFieldId()
  return (
    <FieldShell field={field} id={id}>
      <input
        id={id}
        type="number"
        min={field.min}
        max={field.max}
        className={inputCls}
        value={value ?? 0}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
    </FieldShell>
  )
}

function useSitePages() {
  const { content } = useEditor()
  return [
    "/", "/fleet", "/services", "/about", "/contact", "/quote",
    ...(content.fleet || []).map((f) => `/fleet/${f.id}`),
    ...(content.services || []).map((s) => `/services/${s.id}`),
    "{phoneLink}", "{cellLink}", "{emailLink}", "{mapsLink}",
  ]
}

function LinkInput({ id, value, onChange, placeholder = "/page or https://…" }) {
  const pages = useSitePages()
  const listId = `${id}-pages`
  return (
    <div className="relative">
      <FaLink className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={11} />
      <input id={id} list={listId} type="text" className={`${inputCls} pl-8`} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <datalist id={listId}>
        {pages.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
    </div>
  )
}

function LinkField({ field, value, onChange }) {
  const id = useFieldId()
  return (
    <FieldShell field={field} id={id}>
      <LinkInput id={id} value={value} onChange={onChange} />
    </FieldShell>
  )
}

function ButtonField({ field, value, onChange }) {
  const id = useFieldId()
  const v = value || { label: "", href: "" }
  return (
    <div className="col-span-12">
      <Label htmlFor={id}>{field.label}</Label>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs font-medium text-slate-500">Button text</span>
          <input id={id} type="text" className={inputCls} value={v.label ?? ""} onChange={(e) => onChange({ ...v, label: e.target.value })} />
        </div>
        <div>
          <span className="mb-1 block text-xs font-medium text-slate-500">Goes to</span>
          <LinkInput id={`${id}-href`} value={v.href} onChange={(href) => onChange({ ...v, href })} />
        </div>
      </div>
      <Help>{field.help}</Help>
    </div>
  )
}

function SelectField({ field, value, onChange }) {
  const id = useFieldId()
  const isColor = field.options.every((o) => o.value.startsWith("#"))
  if (isColor) {
    return (
      <FieldShell field={field} id={id}>
        <div className="flex flex-wrap gap-2">
          {field.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                value === o.value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: o.value }} />
              {o.label}
            </button>
          ))}
        </div>
      </FieldShell>
    )
  }
  return (
    <FieldShell field={field} id={id}>
      <select id={id} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

function SlugField({ field, value, onChange, path }) {
  const id = useFieldId()
  const { content } = useEditor()
  const parentPath = path.slice(0, -1)
  const listPath = path.slice(0, -2)
  const item = getAt(content, parentPath) || {}
  const siblings = (getAt(content, listPath) || []).filter((x) => x !== item).map((x) => x.id)
  const duplicate = value && siblings.includes(value)
  const suggestion = slugify(item[field.from])
  return (
    <FieldShell field={{ ...field, help: undefined }} id={id}>
      <div className={`flex overflow-hidden rounded-lg border bg-white shadow-sm ${duplicate || !value ? "border-red-400" : "border-slate-300"}`}>
        <span className="flex items-center bg-slate-100 px-3 text-xs text-slate-500">{field.prefix}</span>
        <input id={id} type="text" className="min-w-0 flex-1 px-3 py-2 text-sm text-slate-900 outline-none" value={value ?? ""} onChange={(e) => onChange(slugify(e.target.value) + (e.target.value.endsWith("-") ? "-" : ""))} />
        {suggestion && suggestion !== value && (
          <button type="button" onClick={() => onChange(uniqueSlug(suggestion, siblings))} className="border-l border-slate-200 px-3 text-xs font-semibold text-[#2d8fdd] hover:bg-slate-50">
            Match name
          </button>
        )}
      </div>
      <Help>
        {duplicate
          ? "Another item already uses this address — please choose a different one."
          : !value
            ? "Required. Lowercase letters, numbers and dashes only."
            : "Lowercase letters, numbers and dashes. Changing it changes the page's web address."}
      </Help>
    </FieldShell>
  )
}

// ── Icon picker ───────────────────────────────

function IconField({ field, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  return (
    <div className="col-span-12 sm:col-span-3" ref={ref}>
      <Label>{field.label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:border-slate-400"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0f2d4a] text-[#c9a84c]">
            {createElement(getIcon(value), { size: 14 })}
          </span>
          Change
          <FaChevronDown size={10} className="ml-auto text-slate-400" />
        </button>
        {open && (
          <div className="absolute left-0 z-30 mt-2 grid w-72 grid-cols-6 gap-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
            {ICON_OPTIONS.map((key) => {
              const I = ICONS[key]
              return (
                <button
                  key={key}
                  type="button"
                  title={key.split("/")[1].replace(/^Fa/, "")}
                  onClick={() => {
                    onChange(key)
                    setOpen(false)
                  }}
                  className={`flex h-10 items-center justify-center rounded-lg border transition ${
                    key === value ? "border-[#c9a84c] bg-[#c9a84c]/15 text-[#0f2d4a]" : "border-transparent text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <I size={16} />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Images ────────────────────────────────────

function useUpload() {
  const { upload } = useEditor()
  const [busy, setBusy] = useState(false)
  const run = async (file) => {
    setBusy(true)
    try {
      return await upload(file)
    } finally {
      setBusy(false)
    }
  }
  return [busy, run]
}

function ImagePreview({ src, size }) {
  const box = size === "icon" ? "h-20 w-20 bg-[#0f2d4a]" : size === "square" ? "h-24 w-24" : "h-24 w-40"
  if (!src) {
    return (
      <div className={`${box} flex shrink-0 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400`}>
        <FaImage size={18} />
        <span className="mt-1 text-[10px]">No image</span>
      </div>
    )
  }
  if (size === "icon") {
    return (
      <div className={`${box} flex shrink-0 items-center justify-center rounded-lg p-4`}>
        <div
          className="h-full w-full"
          style={{
            backgroundColor: "#c9a84c",
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`${box} shrink-0 rounded-lg border border-slate-200 bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px] object-cover`} />
  )
}

function ImageField({ field, value, onChange }) {
  const id = useFieldId()
  const fileRef = useRef(null)
  const [busy, upload] = useUpload()
  const [showUrl, setShowUrl] = useState(false)

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    const url = await upload(file)
    if (url) onChange(url)
  }

  return (
    <div className="col-span-12">
      <Label htmlFor={id}>{field.label}</Label>
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center">
        <ImagePreview src={value} size={field.size} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0f2d4a] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#1e4d7b] disabled:opacity-60"
            >
              <FaUpload size={11} /> {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            <button type="button" onClick={() => setShowUrl((s) => !s)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-400">
              <FaLink size={10} /> {showUrl ? "Hide link" : "Use a link"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                <FaXmark size={11} /> Remove
              </button>
            )}
          </div>
          {showUrl && (
            <input id={id} type="text" className={inputCls} placeholder="https://…" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          )}
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" className="hidden" onChange={onFile} />
        </div>
      </div>
      <Help>{field.help}</Help>
    </div>
  )
}

function ImagesField({ field, value, onChange }) {
  const list = Array.isArray(value) ? value : []
  const fileRef = useRef(null)
  const [busy, upload] = useUpload()
  const [replaceIdx, setReplaceIdx] = useState(null)

  const move = (i, d) => {
    const next = [...list]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
  }

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ""
    if (!files.length) return
    if (replaceIdx !== null) {
      const url = await upload(files[0])
      if (url) onChange(list.map((x, j) => (j === replaceIdx ? url : x)))
      setReplaceIdx(null)
      return
    }
    const urls = []
    for (const f of files) {
      const url = await upload(f)
      if (url) urls.push(url)
    }
    if (urls.length) onChange([...list, ...urls])
  }

  return (
    <div className="col-span-12">
      <Label>{field.label}</Label>
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
        {list.length === 0 && <p className="mb-3 text-xs text-slate-500">No images yet.</p>}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((src, i) => (
            <div key={i} className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-24 w-full bg-slate-100 object-cover" />
              <div className="flex items-center justify-between px-1 py-1">
                <span className="pl-1 text-[11px] font-semibold text-slate-500">#{i + 1}</span>
                <div className="flex">
                  <button type="button" className={iconBtn} title="Move left" disabled={i === 0} onClick={() => move(i, -1)}>
                    <FaArrowUp size={10} className="-rotate-90" />
                  </button>
                  <button type="button" className={iconBtn} title="Move right" disabled={i === list.length - 1} onClick={() => move(i, 1)}>
                    <FaArrowDown size={10} className="-rotate-90" />
                  </button>
                  <button type="button" className={iconBtn} title="Replace" onClick={() => { setReplaceIdx(i); fileRef.current?.click() }}>
                    <FaUpload size={10} />
                  </button>
                  <button type="button" className={`${iconBtn} hover:!text-red-600`} title="Remove" onClick={() => onChange(list.filter((_, j) => j !== i))}>
                    <FaTrashCan size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            disabled={busy}
            onClick={() => { setReplaceIdx(null); fileRef.current?.click() }}
            className="flex h-[122px] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-xs font-semibold text-slate-500 transition hover:border-[#2d8fdd] hover:text-[#2d8fdd] disabled:opacity-60"
          >
            <FaPlus size={14} />
            {busy ? "Uploading…" : "Add images"}
          </button>
        </div>
        <UrlAdder onAdd={(url) => onChange([...list, url])} />
        <input ref={fileRef} type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif,image/avif" className="hidden" onChange={onFiles} />
      </div>
      <Help>{field.help}</Help>
    </div>
  )
}

function UrlAdder({ onAdd }) {
  const [url, setUrl] = useState("")
  return (
    <div className="mt-3 flex gap-2">
      <input type="text" className={inputCls} placeholder="…or paste an image link (https://…)" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button
        type="button"
        disabled={!url.trim()}
        onClick={() => { onAdd(url.trim()); setUrl("") }}
        className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-40"
      >
        Add link
      </button>
    </div>
  )
}

// ── Lists ─────────────────────────────────────

function StringsField({ field, value, onChange }) {
  const list = Array.isArray(value) ? value : []
  const refs = useRef([])
  const focusLast = useRef(false)

  // After "Add", put the cursor in the new row.
  useEffect(() => {
    if (focusLast.current) {
      refs.current[list.length - 1]?.focus()
      focusLast.current = false
    }
  }, [list.length])

  const move = (i, d) => {
    const next = [...list]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
  }

  return (
    <div className="col-span-12">
      <Label>{field.label}</Label>
      <div className={`grid gap-2 ${field.inline ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="w-6 shrink-0 text-right text-[11px] font-semibold text-slate-400">{i + 1}.</span>
            <input
              ref={(el) => (refs.current[i] = el)}
              type="text"
              className={inputCls}
              value={item ?? ""}
              onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  onChange([...list.slice(0, i + 1), "", ...list.slice(i + 1)])
                  setTimeout(() => refs.current[i + 1]?.focus(), 0)
                }
              }}
            />
            {!field.inline && (
              <>
                <button type="button" className={iconBtn} title="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                  <FaArrowUp size={11} />
                </button>
                <button type="button" className={iconBtn} title="Move down" disabled={i === list.length - 1} onClick={() => move(i, 1)}>
                  <FaArrowDown size={11} />
                </button>
              </>
            )}
            <button type="button" className={`${iconBtn} hover:!bg-red-50 hover:!text-red-600`} title="Remove" onClick={() => onChange(list.filter((_, j) => j !== i))}>
              <FaTrashCan size={11} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => { focusLast.current = true; onChange([...list, ""]) }}
        className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#2d8fdd] hover:bg-[#2d8fdd]/10"
      >
        <FaPlus size={10} /> Add {field.itemName || "item"}
      </button>
      <Help>{field.help}</Help>
    </div>
  )
}

function ListField({ field, value, path }) {
  const { update, focus } = useEditor()
  const list = Array.isArray(value) ? value : []
  const pathStr = path.join(".")
  const [open, setOpen] = useState(() => new Set())

  // Open the item a search result pointed at (adjusting state when the prop changes).
  const [seenFocus, setSeenFocus] = useState(null)
  if (focus !== seenFocus) {
    setSeenFocus(focus)
    const prefix = `${pathStr}.`
    if (focus && focus.startsWith(prefix)) {
      const idx = Number(focus.slice(prefix.length).split(".")[0])
      if (Number.isInteger(idx)) setOpen((s) => new Set(s).add(idx))
    }
  }

  const setList = (next) => update(path, next)
  const toggle = (i) => setOpen((s) => {
    const n = new Set(s)
    n.has(i) ? n.delete(i) : n.add(i)
    return n
  })
  // Keep the "open" state attached to the right items when they move.
  const remapOpen = (fn) => setOpen((s) => new Set([...s].map(fn).filter((i) => i >= 0)))

  const move = (i, d) => {
    const next = [...list]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    setList(next)
    remapOpen((j) => (j === i ? i + d : j === i + d ? i : j))
  }

  const withId = (item) => {
    if (!field.idField) return item
    const taken = list.map((x) => x[field.idField])
    return { ...item, [field.idField]: uniqueSlug(item.name || item.label || field.itemName, taken) }
  }

  const add = () => {
    setList([...list, withId(structuredClone(field.newItem))])
    setOpen((s) => new Set(s).add(list.length))
  }

  const duplicate = (i) => {
    const copy = structuredClone(list[i])
    if (copy.name) copy.name = `${copy.name} (copy)`
    else if (copy.label) copy.label = `${copy.label} (copy)`
    const next = [...list.slice(0, i + 1), withId(copy), ...list.slice(i + 1)]
    setList(next)
    remapOpen((j) => (j > i ? j + 1 : j))
    setOpen((s) => new Set(s).add(i + 1))
  }

  const remove = (i) => {
    const title = field.itemTitle?.(list[i]) || `${field.itemName} ${i + 1}`
    if (!window.confirm(`Delete “${title}”? You can still undo this by clicking “Discard changes” before saving.`)) return
    setList(list.filter((_, j) => j !== i))
    remapOpen((j) => (j === i ? -1 : j > i ? j - 1 : j))
  }

  const actions = (i) => (
    <div className="flex shrink-0 items-center">
      {field.previewPath && (
        <a href={field.previewPath(list[i])} target="_blank" rel="noreferrer" className={iconBtn} title="View on website" onClick={(e) => e.stopPropagation()}>
          <FaArrowUpRightFromSquare size={11} />
        </a>
      )}
      <button type="button" className={iconBtn} title="Move up" disabled={i === 0} onClick={(e) => { e.stopPropagation(); move(i, -1) }}>
        <FaArrowUp size={11} />
      </button>
      <button type="button" className={iconBtn} title="Move down" disabled={i === list.length - 1} onClick={(e) => { e.stopPropagation(); move(i, 1) }}>
        <FaArrowDown size={11} />
      </button>
      {!field.inline && (
        <button type="button" className={iconBtn} title="Duplicate" onClick={(e) => { e.stopPropagation(); duplicate(i) }}>
          <FaCopy size={11} />
        </button>
      )}
      <button type="button" className={`${iconBtn} hover:!bg-red-50 hover:!text-red-600`} title="Delete" onClick={(e) => { e.stopPropagation(); remove(i) }}>
        <FaTrashCan size={11} />
      </button>
    </div>
  )

  return (
    <div className="col-span-12">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-slate-700">
          {field.label} <span className="font-normal text-slate-400">({list.length})</span>
        </span>
        {!field.inline && list.length > 1 && (
          <button
            type="button"
            className="text-xs font-medium text-slate-500 hover:text-slate-900"
            onClick={() => setOpen(open.size ? new Set() : new Set(list.map((_, i) => i)))}
          >
            {open.size ? "Collapse all" : "Expand all"}
          </button>
        )}
      </div>

      <div className="space-y-2">
        {list.map((item, i) =>
          field.inline ? (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3">
              <span className="mt-8 w-5 shrink-0 text-right text-[11px] font-semibold text-slate-400">{i + 1}.</span>
              <div className="min-w-0 flex-1">
                <Fields fields={field.fields} basePath={[...path, i]} />
              </div>
              <div className="mt-6">{actions(i)}</div>
            </div>
          ) : (
            <div key={i} className={`rounded-xl border bg-white transition ${open.has(i) ? "border-slate-300 shadow-sm" : "border-slate-200"}`}>
              <div role="button" tabIndex={0} onClick={() => toggle(i)} onKeyDown={(e) => e.key === "Enter" && toggle(i)} className="flex cursor-pointer select-none items-center gap-3 px-3 py-2.5">
                <span className="text-slate-400">{open.has(i) ? <FaChevronDown size={11} /> : <FaChevronRight size={11} />}</span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[11px] font-bold text-slate-500">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-800">
                    {field.itemTitle?.(item) || <span className="italic text-slate-400">Untitled {field.itemName}</span>}
                  </span>
                  {field.itemSubtitle && <span className="block truncate text-xs text-slate-400">{field.itemSubtitle(item)}</span>}
                </span>
                {actions(i)}
              </div>
              {open.has(i) && (
                <div className="border-t border-slate-100 px-4 pb-5 pt-4">
                  <Fields fields={field.fields} basePath={[...path, i]} />
                </div>
              )}
            </div>
          )
        )}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#2d8fdd] hover:text-[#2d8fdd]"
      >
        <FaPlus size={10} /> Add {field.itemName || "item"}
      </button>
      <Help>{field.help}</Help>
    </div>
  )
}

function FleetPickerField({ field, value, onChange }) {
  const { content } = useEditor()
  const selected = Array.isArray(value) ? value : []
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
  return (
    <div className="col-span-12">
      <Label>{field.label}</Label>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {(content.fleet || []).map((f) => (
          <label
            key={f.id}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
              selected.includes(f.id) ? "border-[#c9a84c] bg-[#c9a84c]/10 text-slate-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <input type="checkbox" className="accent-[#c9a84c]" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} />
            {f.name}
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Previews ──────────────────────────────────

function HeroTitlePreview({ hero }) {
  if (!hero) return null
  return (
    <div className="mb-4 rounded-lg bg-[#0f2d4a] px-5 py-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <div className="mb-1 flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        <FaCircleInfo size={9} /> Preview
      </div>
      <div className="text-2xl font-black leading-tight text-white">
        {hero.titleStart}{" "}
        <span className="text-[#2d8fdd] underline decoration-[#c9a84c] decoration-2 underline-offset-4">{hero.titleAccent1}</span>
        {` ${hero.titleJoin} `}
        <span className="text-[#2d8fdd]">{hero.titleAccent2}</span>
        <br />
        {`${hero.titleLine2} `}
        <span className="text-[#c9a84c]">{hero.titleAccent3}</span>
      </div>
    </div>
  )
}

const FIELD_TYPES = {
  text: TextField,
  textarea: TextareaField,
  number: NumberField,
  link: LinkField,
  button: ButtonField,
  select: SelectField,
  slug: SlugField,
  icon: IconField,
  image: ImageField,
  images: ImagesField,
  strings: StringsField,
  list: ListField,
  fleetPicker: FleetPickerField,
}
