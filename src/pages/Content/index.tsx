import RecentEmojis from '@utils/storage';
import { issueLoader } from '@loaders/issue_loader';
import 'arrive';
import '@loaders/project_loader';
import '@loaders/pr_review_loader';
RecentEmojis.init();
issueLoader();
