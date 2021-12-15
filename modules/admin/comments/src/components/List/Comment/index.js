
import { deleteItem, selectInProcess } from '@modules/admin-comments';

import moment from '@packages/moment';

import { Text, Button } from '@ui.packages/admin-kit';
import { Confirm, openDialog, closeDialog } from '@ui.packages/admin-dialog';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function Comment({ uuid, user, customer, parentUuid, createdAt, content }) {
  const dispatch = useDispatch();

  const inProcess = useSelector(selectInProcess);


  function handleEdit() {
    dispatch(openDialog('comment-modify', { uuid }));
  }

  function handleDelete() {
    dispatch(openDialog('confirm-' + uuid));
  }

  async function handleConfirmDelete() {
    const isSuccess = await dispatch(deleteItem(uuid));
    if (isSuccess) {
      dispatch(closeDialog('confirm-' + uuid));
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <div className={styles['user']}>
          {customer && customer['type'] === 'admin' && (
            <span className={cn(styles['icon'], 'fas fa-crown')} />
          )}
          <Text type={Text.TYPE_BODY}>{ customer ? customer['name'] : user }</Text>
        </div>
        <div className={styles['date']}>
          <Text>{ moment(createdAt).format('DD.MM.YYYY') }</Text>
        </div>
      </div>
      <div className={styles['content']}>
        <Text>{ content }</Text>
      </div>
      <div className={styles['controls']}>
        <Button
          size={Button.SIZE_SMALL}
          mode={Button.MODE_DANGER}
          form={Button.FORM_CONTEXT}
          disabled={inProcess}
          onClick={() => handleDelete(uuid)}
        >Удалить</Button>
        { ! parentUuid && (
          <Button
            size={Button.SIZE_SMALL}
            mode={Button.MODE_PRIMARY}
            form={Button.FORM_OUTLINE}
            disabled={inProcess}
            onClick={() => handleEdit(uuid)}
          >Ответить</Button>
        )}
      </div>

      <Confirm
        name={'confirm-' + uuid}
        message={'Вы точно хотите удалить комментарий?'}
        onConfirm={() => handleConfirmDelete()}
        onCancel={() => dispatch(closeDialog('confirm-' + uuid))}
      />
    </div>
  );
}

function Comments({ comments, ...props }) {
  if (comments) {
    return (
      <div className={styles['combine']}>
        <div className={styles['parent']}>
          <Comment {...props} />
        </div>
        <div className={styles['children']}>
          {comments.map((comment) => (
            <Comment key={comment['uuid']} {...comment} />
          ))}
        </div>
      </div>
    );
  }

  return <Comment {...props} />
}

export default Comments;
