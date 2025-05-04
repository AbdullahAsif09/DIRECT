import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
function CkEditor({ setFieldValue = () => {}, name, value, onChange }) {
  const handleChangeValue = (event, editor) => {
    const data = editor.getData();
    setFieldValue(name, data);
  };
  return (
    <div>
      <CKEditor
        config={{
          simpleUpload: {
            uploadUrl: "",
          },
        }}
        data={value}
        onChange={onChange ? onChange : handleChangeValue}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return {
              upload: async () => {
                const data = await loader.file;

                return new Promise((resolve, reject) => {
                  resolve({ default: URL.createObjectURL(data) });
                });
              },
              abort: () => {
                // Implement if needed
              },
            };
          };
        }}
        // config={{
        //   ckfinder: {
        //     uploadUrl: keys.rootserver + "admin/multipleImages",
        //   },
        // }}
        editor={ClassicEditor}
      />
    </div>
  );
}

export default CkEditor;
