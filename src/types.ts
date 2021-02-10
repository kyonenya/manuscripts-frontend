export type articlable = {
  text: string,
  tags: string[],
  starred: boolean,
  uuid: string,
  created_at: string,
  modified_at: string,
}

export const emptyArticle = {
  text: '...',
  tags: [''],
  starred: false,
  uuid: '',
  created_at: '',
  modified_at: '',
};
