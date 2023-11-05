import { ConfigurationFilter } from '../../core/entities/configuration-filter/configuration-filter';

export type FilterPredicate<T> = (input: T, filter: ConfigurationFilter) => boolean;
