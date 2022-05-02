interface Club {
  clubId: string;
  name: string;
  photoURL: string;
  accountId: string | null;
  isAccountSetUp: number;
}

export default Club;
