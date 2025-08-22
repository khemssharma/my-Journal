package com.firstAPI.demo.repository;

import com.firstAPI.demo.entity.JournalEntry;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalEntryRepository extends MongoRepository<JournalEntry, ObjectId> {}
