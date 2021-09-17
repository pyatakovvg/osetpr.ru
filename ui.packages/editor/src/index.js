
import types from 'prop-types';
import { unemojify } from "node-emoji";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";

import List from './List';
import Blocks from './Blocks';
import Styles from './Styles';
import TextAlign from './TextAlign';

import cn from 'classnames';
import styles from './defaults.module.scss';


function EditorHTML({ className, readOnly, value, onChange }) {
  const [isFirst, setFirst] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (isFirst) {
      return void 0;
    }

    if ( ! onChange) {
      return void 0;
    }

    const newValue = unemojify(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    if (value && value !== newValue) {
      const blocks = convertFromHTML(value);
      const content = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);

      setFirst(true);

      const newValue = unemojify(draftToHtml(convertToRaw(content)));
      onChange(newValue);

      setEditorState(EditorState.createWithContent(content));
    }
  }, [value]);

  function onEditorStateChange(editorState) {
    const newValue = unemojify(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    if (value !== newValue) {
      onChange(newValue);
    }

    setEditorState(editorState);
  }

  return (
    <Editor
      readOnly={readOnly}
      editorState={editorState}
      wrapperClassName={cn(styles['wrapper'], { [styles['wrapper--readonly']]: readOnly })}
      toolbarClassName={cn(styles['toolbar'], { [styles['toolbar--readonly']]: readOnly })}
      editorClassName={cn(styles['content'], className, { [styles['content--readonly']]: readOnly })}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: readOnly ? [] : ['inline', 'blockType', 'list', 'textAlign'], // 'link', 'image', 'history'],
        blockType: { component: Blocks },
        inline: { component: Styles },
        list: { component: List },
        textAlign: { component: TextAlign },
      }}
    />
  );
}

EditorHTML.propTypes = {
  readOnly: types.bool,
  className: types.string,
  value: types.string,
  onChange: types.func,
};

EditorHTML.defaultProps = {
  readOnly: false,
  className: null,
  value: '',
}

export default EditorHTML;
