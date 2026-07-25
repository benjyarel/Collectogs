import { Artist, CollectionFolder, DiscogsUser, Release } from '@/app/types'

export const FAKE_FOLDERS: CollectionFolder[] = [
    { id: 1, name: 'All', count: 42, resource_url: 'https://fake-api.com/folders/1' },
    { id: 2, name: 'Vinyl', count: 12, resource_url: 'https://fake-api.com/folders/2' },
]

export const FAKE_ARTISTS: Artist[] = [
    { id: 10, name: 'Radiohead' },
    { id: 11, name: 'Portishead' },
]

export const FAKE_RELEASES: Release[] = [
    {
        id: 1000,
        category: 'master',
        artistName: 'Radiohead',
        artistId: 10,
        title: 'OK Computer',
        masterId: 100,
        masterUrl: 'https://fake-api.com/masters/100',
        year: 1997,
        coverImageUrl: '',
        thumbImageUrl: '',
    },
]

export const FAKE_USER: DiscogsUser = Object.freeze({
    id: 123,
    resource_url: 'https://fake-api.com/users/Jude',
    uri: 'https://www.fake.com/user/Jude',
    username: 'Jude',
    name: 'Hey Jude',
    home_page: '',
    location: '3 Abbey Road, London',
    profile: '',
    registered: '2017-11-30T01:34:48-08:00',
    rank: 0,
    num_pending: 0,
    num_for_sale: 0,
    num_lists: 0,
    releases_contributed: 0,
    releases_rated: 1,
    rating_avg: 5,
    inventory_url: 'https://fake-api.com/users/Jude/inventory',
    collection_folders_url: 'https://fake-api.com/users/Jude/collection/folders',
    collection_fields_url: 'https://fake-api.com/users/Jude/collection/fields',
    wantlist_url: 'https://fake-api.com/users/Jude/wants',
    avatar_url: 'https://i.discogs.com/XXX.jpeg',
    curr_abbr: 'EUR',
    activated: true,
    marketplace_suspended: false,
    banner_url: 'https://i.discogs.com/XXX.jpeg',
    buyer_rating: 100,
    buyer_rating_stars: 5,
    buyer_num_ratings: 1,
    seller_rating: 0,
    seller_rating_stars: 0,
    seller_num_ratings: 0,
    is_staff: false,
    num_collection: 546,
    num_wantlist: 19,
    email: 'hey.jude@beatles.com',
    num_unread: 0,
})
