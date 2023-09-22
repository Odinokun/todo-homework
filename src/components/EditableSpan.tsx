import { ChangeEvent, FC, useState } from 'react';

interface IProps {
  title: string;
  onChange: (title: string) => void;
}

export const EditableSpan: FC<IProps> = ({ title, onChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
    onChange(newTitle);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(title);
  };

  const deactivateEditMode = () => setEditMode(false);

  return (
    <>
      {editMode ? (
        <input
          autoFocus
          value={newTitle}
          onBlur={deactivateEditMode}
          onChange={inputChangeHandler}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
      )}
    </>
  );
};
