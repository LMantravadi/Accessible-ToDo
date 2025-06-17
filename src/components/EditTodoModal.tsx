import { useRef } from "react";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root")!);

type EditTodoProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: (description: string) => void;
};

export default function EditTodoModal({
  isOpen,
  title,
  description,
  onCancel,
  onSave,
}: EditTodoProps) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Edit Todo"
      className="flex items-center justify-center p-4 z-50 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      {/* <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 modal-scale-enter-to"> */}
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-blue-500">Todo Description</h2>
          <button
            id="closeModal"
            className="text-gray-500 hover:text-gray-100"
            onClick={onCancel}
          >
            X
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-3 pb-3 border-b border-gray-700">
          Description for {title}
        </p>
        <textarea
          id="descriptionTextArea"
          rows={6}
          ref={descriptionRef}
          aria-placeholder="Add your todo description here..."
          className="w-full p-3 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:ring-2  focus: ring-blue-500 focus:border-transparent outline-none notes-textarea"
          defaultValue={description}
        ></textarea>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            id="cancelButton"
            className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            id="saveButton"
            className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors"
            onClick={() => onSave(descriptionRef.current?.value || "")}
          >
            Save Notes
          </button>
        </div>
      </div>
      {/* </div> */}
    </Modal>
  );
}
