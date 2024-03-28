import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const apiKey = "w0gzo3i12e5svy1h86z4djm9qn60iuguq7wk084zazqe1ry4";
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        control={control}
        name={name||"content"}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={apiKey}
            init={{            
              height: 300,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                'media', 'table', 'emoticons', 'template', 'help'

              ],
              toolbar:
              'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
              'forecolor backcolor emoticons | help',
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
