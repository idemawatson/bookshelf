export async function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy("__name__").limit(batchSize);

  await deleteQueryBatch(db, query, batchSize);
}

async function deleteQueryBatch(db, query, batchSize) {
  const snapshot = await query.get();
  // When there are no documents left, we are done
  if (snapshot.size === 0) {
    return 0;
  }

  // Delete documents in a batch
  let batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  const numDeleted = snapshot.size;
  if (numDeleted === 0) {
    return;
  }

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, batchSize);
  });
}
